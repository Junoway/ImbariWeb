import Script from "next/script";

export default function FAQSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes Imbari Coffee different from other Uganda coffee exporters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Imbari Coffee has been producing premium East African coffee since 1893. We source directly from Mt. Elgon farmers, ensuring sustainable practices, fair trade pricing, and organic certification. Our specialty lies in premium Uganda Arabica and Robusta, as well as Ethiopian and Kenyan beans."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Uganda Arabica and Robusta coffee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Uganda Arabica from Mt. Elgon offers bright, fruity notes with balanced acidity, perfect for specialty coffee lovers. Uganda Robusta is bold, earthy, with higher caffeine content and a full body - ideal for espresso and instant coffee manufacturing. Both are organically grown and sustainably harvested."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer organic and fair trade certified coffee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All Imbari Coffee products are organic certified and fair trade compliant. We work directly with farmers in Uganda, Ethiopia, Kenya, and Rwanda to ensure sustainable practices and fair compensation throughout our value chain."
        }
      },
      {
        "@type": "Question",
        "name": "What coffee origins do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer premium coffee from multiple East African origins: Uganda (Mt. Elgon Arabica and Robusta), Ethiopia (finest Arabica varieties), Kenya (AA grade specialty coffee), and Rwanda (specialty micro-lots). Each origin provides unique flavor profiles representing the best of East African coffee."
        }
      },
      {
        "@type": "Question",
        "name": "How does Imbari Coffee subscription work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Subscribe to receive fresh-roasted coffee monthly and save 10% on every order. Enjoy free shipping on orders over $30, cancel or pause anytime, and get exclusive subscriber perks. Choose from our full range of Uganda Arabica, Robusta, Ethiopian, and Kenyan specialty coffee."
        }
      },
      {
        "@type": "Question",
        "name": "What is Kahawa1893?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kahawa1893 represents our heritage brand, honoring the Swahili word 'kahawa' (coffee) and our founding year 1893. It symbolizes over 130 years of East African coffee excellence, sustainable farming practices, and our commitment to bringing Africa's premium coffee to the world."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer private label and instant coffee manufacturing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Imbari Coffee is a leading African instant coffee manufacturer offering private label services. We can produce custom blends, roast profiles, and packaging for wholesale distributors and coffee brands worldwide. Contact us for bulk orders and manufacturing partnerships."
        }
      },
      {
        "@type": "Question",
        "name": "Where is your coffee grown?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our coffee is grown in premium East African regions: Mt. Elgon slopes in Uganda (1,800-2,300m elevation), Ethiopian highlands (renowned for Arabica origins), Kenyan volcanic soils (producing AA grade beans), and Rwandan mountain regions. Each origin benefits from ideal altitude, rainfall, and volcanic soil."
        }
      }
    ]
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}

