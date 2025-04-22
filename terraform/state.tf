terraform {
  backend "s3" {
    bucket = "vertex-landing-page-state"
    key = "global/s3/terraform.tfstate"
    region = "ap-southeast-1"
    dynamodb_table = "vertex-landing-page-table"
  }
}