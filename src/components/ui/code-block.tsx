import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/common.utils";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
  className?: string;
};

// Syntax highlighting colors
const syntaxColors = {
  comment: "text-muted-foreground",
  keyword: "text-primary-400",
  string: "text-green-400",
  function: "text-blue-400",
  variable: "text-foreground",
  type: "text-orange-400",
};

export default function CodeBlock({
  code,
  language = "typescript",
  fileName = "index.ts",
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl bg-card overflow-hidden shadow-lg border border-border/50",
        className
      )}
    >
      {/* Code editor header */}
      <div className="flex items-center px-4 py-2 bg-muted/50 border-b border-border">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-center flex-1 text-xs text-muted-foreground">
          {fileName}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={copyToClipboard}
          title="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Code content */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: "1rem", background: "transparent" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
