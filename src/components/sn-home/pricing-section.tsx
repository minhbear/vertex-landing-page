import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "../../../lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  useCase: z
    .string()
    .min(10, {
      message: "Please provide a brief description of your use case.",
    })
    .max(500, {
      message: "Description is too long.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

type PricingTierProps = {
  name: string;
  description: string;
  price: string;
  unit: string;
  features: Array<{ text: string; available: boolean }>;
  buttonText: string;
  buttonVariant: "default" | "outline";
  popular?: boolean;
  delay: number;
};

const tierAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: delay * 0.2,
    },
  }),
};

function PricingTier({
  name,
  description,
  price,
  unit,
  features,
  buttonText,
  buttonVariant,
  popular = false,
  delay,
}: PricingTierProps) {
  return (
    <motion.div
      className={`bg-card rounded-xl overflow-hidden relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        popular
          ? "border border-primary-500/30 hover:shadow-primary-900/20"
          : "border border-border/50 hover:shadow-background/10"
      }`}
      variants={tierAnimation}
      custom={delay}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-xs px-3 py-1 font-semibold text-white rounded-bl-lg">
          Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/{unit}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.available ? (
                <Check
                  className={`h-5 w-5 ${
                    popular
                      ? "text-primary-400"
                      : popular === false && name === "Enterprise"
                      ? "text-green-500"
                      : "text-blue-400"
                  } mr-2 mt-0.5 flex-shrink-0`}
                />
              ) : (
                <X className="h-5 w-5 text-muted-foreground/50 mr-2 mt-0.5 flex-shrink-0" />
              )}
              <span
                className={!feature.available ? "text-muted-foreground/50" : ""}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        <a href="#early-access">
          <Button
            variant={buttonVariant}
            className={`w-full ${
              buttonVariant === "default" ? "" : "bg-card hover:bg-card/80"
            }`}
          >
            {buttonText}
          </Button>
        </a>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const tiers = [
    {
      name: "Free",
      description: "Perfect for hobbyists and small projects",
      price: "$0",
      unit: "month",
      features: [
        { text: "2 indexers", available: true },
        { text: "100K API calls per month", available: true },
        { text: "1GB storage", available: true },
        { text: "Community support", available: true },
        { text: "Custom domains", available: false },
        { text: "Priority indexing", available: false },
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      delay: 0,
    },
    // {
    //   name: "Pro",
    //   description: "For teams building serious dApps",
    //   price: "$99",
    //   unit: "month",
    //   features: [
    //     { text: "10 indexers", available: true },
    //     { text: "2M API calls per month", available: true },
    //     { text: "20GB storage", available: true },
    //     { text: "Email support", available: true },
    //     { text: "Custom domains", available: true },
    //     { text: "Dedicated infrastructure", available: false },
    //   ],
    //   buttonText: "Get Started",
    //   buttonVariant: "default" as const,
    //   popular: true,
    //   delay: 1
    // },
    // {
    //   name: "Enterprise",
    //   description: "For high-traffic dApps and enterprises",
    //   price: "Custom",
    //   unit: "month",
    //   features: [
    //     { text: "Unlimited indexers", available: true },
    //     { text: "Custom API call limits", available: true },
    //     { text: "Unlimited storage", available: true },
    //     { text: "Priority support with SLA", available: true },
    //     { text: "Custom domains", available: true },
    //     { text: "Dedicated infrastructure", available: true },
    //   ],
    //   buttonText: "Contact Sales",
    //   buttonVariant: "outline" as const,
    //   delay: 2
    // }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      useCase: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/waitlist", values);
      toast({
        title: "Success!",
        description:
          "Thank you for joining our waitlist. We'll be in touch soon!",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission failed",
        description:
          "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex grid grid-cols-[40%_60%] max-w-[1200px] mx-auto">
      <section id="pricing" className="py-20 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-xl font-bold mb-4">
              Flexible Pricing for Every Need
            </h2>
            <p className="text-lg text-muted-foreground text-sm">
              Start for free, scale as you grow with transparent pricing
            </p>
          </div>

          <motion.div
            className=" gap-8 max-w-5xl mx-auto"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {tiers.map((tier, index) => (
              <PricingTier key={index} {...tier} />
            ))}
          </motion.div>
        </div>
      </section>

      <section id="early-access" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-xl font-bold mb-4">Get Early Access</h2>
            <p className="text-sm text-muted-foreground px-10">
              Join the waitlist for early access to Vertex, be the first to
              experience the future of Solana data indexing.
            </p>
          </div>

          <div className="max-w-lg mx-auto bg-card rounded-xl p-6 md:p-8 border border-border/50">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Project (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company or project"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="useCase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How do you plan to use Vertex?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a bit about your project and use case"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Join the Waitlist"}
                </Button>

                <FormDescription className="text-xs text-center">
                  By submitting, you agree to receive updates about Sol Index
                  Protocol. We'll never spam or share your information.
                </FormDescription>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
