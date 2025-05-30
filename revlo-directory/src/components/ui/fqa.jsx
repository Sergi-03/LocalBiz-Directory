import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Fqa() {

    return(
     <div className="w-full px-4 py-10 bg-background">
  <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

  <div className="max-w-2xl mx-auto">
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>How does this directory work?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            This platform helps you discover local businesses near you. You can search by name or category, view them on an interactive map, and explore details like reviews, websites, photos, and more.
          </p>
          <p>
            Both verified and unverified businesses are listed, but verified ones have passed a manual validation process to confirm their authenticity.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>What does "verified business" mean?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Verified businesses have been manually reviewed by our team to ensure they're real, active, and meet quality standards. They carry a “verified” badge to distinguish them from unverified listings.
          </p>
          <p>
            This process helps users make more confident decisions when choosing a business.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Can I leave a review?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Yes, soon you are able to sign up and post your own reviews about the businesses you’ve visited. Reviews are valuable for helping others and building a trustworthy community.
          </p>
          <p>
            Only honest and respectful reviews are accepted, spam and offensive language will be removed.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>Why do some listings lack photos or websites?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Not all businesses have a strong online presence. Some only provide basic information such as name, address, and category.
          </p>
          <p>
            If you own a business and want to improve your profile, feel free to contact us to verify your identity and update your information.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>How can my business appear in this directory?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            If you're a business owner and would like to be featured, simply reach out via our contact form. We'll review your request and guide you through the verification process if needed.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</div>
  )
}