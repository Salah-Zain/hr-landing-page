import React from "react";

export function JsonLd() {
  // 1. Organization & Educational Course Schema
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Practical HR Management & Payroll Certification Program",
    "description": "Comprehensive practical HR training program covering Recruitment, Payroll Processing, Statutory Compliance (PF/ESI/TDS), Zoho HRMS, and GCC Labor Laws with 100% placement support.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "PerpeX HR Academy",
      "sameAs": "https://perpex.in",
      "url": "https://perpex.in",
      "logo": "https://perpex.in/images/logo.png"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["Onsite", "Online", "Blended"],
      "courseWorkload": "PT120H",
      "instructor": [
        {
          "@type": "Person",
          "name": "Mohammed Rafi",
          "jobTitle": "Founder",
          "worksFor": { "@type": "Organization", "name": "PerpeX" }
        },
        {
          "@type": "Person",
          "name": "Navas Shareef",
          "jobTitle": "Founder",
          "worksFor": { "@type": "Organization", "name": "PerpeX" }
        },
        {
          "@type": "Person",
          "name": "Aflah C.P",
          "jobTitle": "Training Manager",
          "worksFor": { "@type": "Organization", "name": "PerpeX" }
        },
        {
          "@type": "Person",
          "name": "Afnidha K",
          "jobTitle": "HR Manager",
          "worksFor": { "@type": "Organization", "name": "PerpeX" }
        },
        {
          "@type": "Person",
          "name": "ShahinSha Thasveer",
          "jobTitle": "Academic Director",
          "worksFor": { "@type": "Organization", "name": "PerpeX" }
        },
        {
          "@type": "Person",
          "name": "Sukanya Surendren",
          "jobTitle": "Assistant Senior Manager",
          "worksFor": { "@type": "Organization", "name": "PerpeX" }
        },
        {
          "@type": "Person",
          "name": "Nissamudeen K",
          "jobTitle": "Soft Skill Trainer",
          "worksFor": { "@type": "Organization", "name": "PerpeX" }
        },
        {
          "@type": "Person",
          "name": "Vineesh V N",
          "jobTitle": "Chief People Officer",
          "worksFor": { "@type": "Organization", "name": "Guest Faculty @ PerpeX" }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "price": "45000",
      "priceCurrency": "INR",
      "category": "Educational Course",
      "availability": "https://schema.org/InStock",
      "url": "https://perpex.in/#pricing"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "520",
      "bestRating": "5"
    }
  };

  // 2. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "PerpeX HR Academy",
    "url": "https://perpex.in",
    "logo": "https://perpex.in/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9633897221",
      "contactType": "Admissions Support",
      "areaServed": "IN",
      "availableLanguage": ["English", "Malayalam"]
    },
    "sameAs": [
      "https://www.instagram.com/perpex.in",
      "https://www.linkedin.com/company/perpex"
    ]
  };

  // 3. FAQPage Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is the PerpeX HR Course designed for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The course is designed for Fresh Graduates starting an HR career, Working Professionals switching to HR, HR Executives seeking promotion, and Business Owners wanting in-house HR & Payroll control."
        }
      },
      {
        "@type": "Question",
        "name": "Does PerpeX provide placement assistance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, PerpeX provides 100% placement support including resume optimization, mock interviews, LinkedIn branding, and direct referrals to 100+ hiring company partners."
        }
      },
      {
        "@type": "Question",
        "name": "What practical HR topics are covered in the curriculum?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The curriculum covers Core HR Recruitment & Onboarding, Payroll Processing (PF, ESI, TDS), Statutory Compliance, HRMS Software (Zoho People, Keka), Excel for HR, and GCC Labor Laws."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
