provider "aws" {
  region = "ap-southeast-1"
}

# S3 bucket
resource "aws_s3_bucket" "vertex_landing_page_bucket" {
  bucket = "vertex-landing-page-bucket"
}

# Ownership Control
resource "aws_s3_bucket_ownership_controls" "vertex_landing_page_bucket_ownership_controls" {
  bucket = aws_s3_bucket.vertex_landing_page_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Public access block settings
resource "aws_s3_bucket_public_access_block" "vertex_landing_page_bucket_public_access_block" {
  bucket = aws_s3_bucket.vertex_landing_page_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = false
}

# Bucket ACL
resource "aws_s3_bucket_acl" "vertex_landing_page_bucket_acl" {

  depends_on = [
    # full reference of ownership resource ------
    aws_s3_bucket_ownership_controls.vertex_landing_page_bucket_ownership_controls,
    aws_s3_bucket_public_access_block.vertex_landing_page_bucket_public_access_block
  ]

  bucket = aws_s3_bucket.vertex_landing_page_bucket.id
  acl    = "public-read"
}

# Bucket policy
resource "aws_s3_bucket_policy" "vertex_landing_page_bucket_policy" {
  bucket = aws_s3_bucket.vertex_landing_page_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.vertex_landing_page_bucket.arn}/*"
      }
    ]
  })
}

# Origin Access Identity
resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "OAI for Vertex Landing Page"
}

# Cloudfront distribution
resource "aws_cloudfront_distribution" "vertex_landing_page_distribution" {
  origin {
    domain_name = aws_s3_bucket.vertex_landing_page_bucket.bucket_regional_domain_name
    origin_id   = "S3-vertex-landing-page-bucket"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Vertex Landing Page"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-vertex-landing-page-bucket"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
