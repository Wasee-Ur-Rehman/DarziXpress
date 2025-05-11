"use client"

import { useState, useEffect, useRef, memo } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState("introduction")
    const sectionRefs = useRef({})

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100
            let currentSection = ""
            Object.entries(sectionRefs.current).forEach(([id, ref]) => {
                if (!ref) return
                const { offsetTop } = ref
                if (scrollPosition >= offsetTop) {
                    currentSection = id
                }
            })

            if (currentSection !== activeSection) {
                setActiveSection(currentSection)
            }
        }
        window.addEventListener("scroll", handleScroll)
        handleScroll()

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [activeSection])

    const scrollToSection = (sectionId) => {
        const section = sectionRefs.current[sectionId]
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 20,
                behavior: "smooth",
            })
        }
    }

    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "collection", title: "Information We Collect" },
        { id: "use", title: "How We Use Your Information" },
        { id: "sharing", title: "Information Sharing" },
        { id: "cookies", title: "Cookies & Tracking Technologies" },
        { id: "retention", title: "Data Retention" },
        { id: "security", title: "Security Measures" },
        { id: "thirdparty", title: "Third-Party Links" },
        { id: "updates", title: "Updates To This Policy" },
        { id: "contact", title: "Contact Us" },
        { id: "rights", title: "Your Privacy Rights" },
    ]

    return (
        <div className="min-h-screen bg-white my-8">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-semibold text-center mb-16">Privacy Policy</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-3 order-2 lg:order-1">
                        <div className="prose prose-gray max-w-none">
                            <div ref={(el) => (sectionRefs.current.introduction = el)} id="introduction" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        1
                                    </span>
                                    Introduction
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        DarziXpress ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                                        explains how your personal information is collected, used, and disclosed by DarziXpress when you use
                                        our website, mobile application, and services (collectively, the "Services").
                                    </p>
                                    <p className="mt-4">
                                        This Privacy Policy applies to information we collect when you use our Services, or when you
                                        otherwise interact with us. We may change this Privacy Policy from time to time. If we make changes,
                                        we will notify you by revising the date at the top of the policy and, in some cases, we may provide
                                        you with additional notice (such as adding a statement to our website or sending you a
                                        notification).
                                    </p>
                                    <p className="mt-4">
                                        We encourage you to read this Privacy Policy carefully to understand our practices regarding your
                                        information. By accessing or using our Services, you acknowledge that you have read and understood
                                        this Privacy Policy.
                                    </p>
                                </div>
                            </div>
                            <div ref={(el) => (sectionRefs.current.collection = el)} id="collection" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        2
                                    </span>
                                    Information We Collect
                                </h2>
                                <div className="mt-4 pl-8">
                                    <h3 className="text-xl font-medium mb-3">Information You Provide to Us</h3>
                                    <p>
                                        We collect information you provide directly to us. For example, we collect information when you:
                                    </p>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Create an account and profile</li>
                                        <li>Submit your body measurements</li>
                                        <li>Upload photos for tailoring purposes</li>
                                        <li>Place an order for tailoring services</li>
                                        <li>Communicate with tailors through our platform</li>
                                        <li>Contact customer support</li>
                                        <li>Participate in surveys or promotions</li>
                                        <li>Post reviews or comments</li>
                                    </ul>

                                    <p className="mt-4">The types of information we may collect include:</p>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Contact information (name, email address, postal address, phone number)</li>
                                        <li>Authentication information (username, password)</li>
                                        <li>Demographic information (gender, age)</li>
                                        <li>Body measurements and size information</li>
                                        <li>Photos of yourself (for fitting purposes)</li>
                                        <li>Style preferences and fashion interests</li>
                                        <li>Payment information (credit card details, billing address)</li>
                                        <li>Order history and preferences</li>
                                        <li>Communications you send to us</li>
                                    </ul>

                                    <h3 className="text-xl font-medium mt-6 mb-3">Information We Collect Automatically</h3>
                                    <p>When you access or use our Services, we automatically collect information about you, including:</p>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>
                                            <strong>Log Information:</strong> We collect log information about your use of the Services,
                                            including the type of browser you use, access times, pages viewed, your IP address, and the page
                                            you visited before navigating to our Services.
                                        </li>
                                        <li>
                                            <strong>Device Information:</strong> We collect information about the computer or mobile device
                                            you use to access our Services, including the hardware model, operating system and version, unique
                                            device identifiers, and mobile network information.
                                        </li>
                                        <li>
                                            <strong>Location Information:</strong> We may collect information about the precise location of
                                            your device with your consent, or approximate location based on your IP address.
                                        </li>
                                        <li>
                                            <strong>Usage Information:</strong> We collect information about your interactions with our
                                            Services, such as the features you use, the actions you take, and the time, frequency, and
                                            duration of your activities.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.use = el)} id="use" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        3
                                    </span>
                                    How We Use Your Information
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>We use the information we collect about you for various purposes, including to:</p>
                                    <ul className="list-disc pl-6 mt-4 space-y-2">
                                        <li>Provide, maintain, and improve our Services</li>
                                        <li>Process and fulfill your orders for tailoring services</li>
                                        <li>Connect you with appropriate tailors based on your requirements</li>
                                        <li>Create and maintain your account and profile</li>
                                        <li>Store your body measurements and style preferences</li>
                                        <li>Process payments and prevent fraudulent transactions</li>
                                        <li>Send you technical notices, updates, security alerts, and support messages</li>
                                        <li>Respond to your comments, questions, and customer service requests</li>
                                        <li>Communicate with you about products, services, offers, and events</li>
                                        <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
                                        <li>
                                            Personalize the Services and provide advertisements, content, or features that match your profile
                                            or interests
                                        </li>
                                        <li>
                                            Facilitate contests, sweepstakes, and promotions and process and deliver entries and rewards
                                        </li>
                                        <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                                        <li>Carry out any other purpose described to you at the time the information was collected</li>
                                    </ul>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.sharing = el)} id="sharing" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        4
                                    </span>
                                    Information Sharing
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>We may share information about you as follows or as otherwise described in this Privacy Policy:</p>
                                    <ul className="list-disc pl-6 mt-4 space-y-2">
                                        <li>
                                            <strong>With Tailors:</strong> We share your information with tailors who provide services through
                                            our platform, including your measurements, photos (for fitting purposes), style preferences, and
                                            contact details.
                                        </li>
                                        <li>
                                            <strong>With Service Providers:</strong> We share information with vendors, consultants, and other
                                            service providers who need access to such information to carry out work on our behalf, such as
                                            payment processors, delivery services, and customer support providers.
                                        </li>
                                        <li>
                                            <strong>For Legal Reasons:</strong> We may disclose information if we believe that disclosure is
                                            in accordance with, or required by, any applicable law, regulation, legal process, or governmental
                                            request.
                                        </li>
                                        <li>
                                            <strong>For Protection:</strong> We may share information to protect the rights, property, and
                                            safety of DarziXpress, our users, or others.
                                        </li>
                                        <li>
                                            <strong>In Connection with a Transfer of Assets:</strong> If we are involved in a merger,
                                            acquisition, financing, reorganization, bankruptcy, or sale of company assets, information about
                                            you may be shared or transferred as part of that transaction.
                                        </li>
                                        <li>
                                            <strong>With Your Consent:</strong> We may share information with your consent or at your
                                            direction.
                                        </li>
                                        <li>
                                            <strong>Aggregated or De-identified Information:</strong> We may share aggregated or de-identified
                                            information, which cannot reasonably be used to identify you, with third parties for industry
                                            analysis, research, demographic profiling, and other similar purposes.
                                        </li>
                                    </ul>
                                    <p className="mt-4">
                                        We do not sell your personal information to third parties for their direct marketing purposes.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.cookies = el)} id="cookies" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        5
                                    </span>
                                    Cookies & Tracking Technologies
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        We and our third-party service providers use cookies, web beacons, and other tracking technologies
                                        to collect information about your browsing activities on our Services. We use this information to
                                        analyze usage patterns, personalize your experience, target our communications, and tailor
                                        advertisements to your interests.
                                    </p>
                                    <h3 className="text-xl font-medium mt-6 mb-3">Types of Cookies We Use</h3>
                                    <ul className="list-disc pl-6 mt-2 space-y-2">
                                        <li>
                                            <strong>Essential Cookies:</strong> These cookies are necessary for the website to function and
                                            cannot be switched off. They are usually only set in response to actions made by you which amount
                                            to a request for services, such as setting your privacy preferences, logging in, or filling in
                                            forms.
                                        </li>
                                        <li>
                                            <strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources
                                            so we can measure and improve the performance of our site. They help us to know which pages are
                                            the most and least popular and see how visitors move around the site.
                                        </li>
                                        <li>
                                            <strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced
                                            functionality and personalization. They may be set by us or by third-party providers whose
                                            services we have added to our pages.
                                        </li>
                                        <li>
                                            <strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising
                                            partners. They may be used by those companies to build a profile of your interests and show you
                                            relevant advertisements on other sites.
                                        </li>
                                    </ul>
                                    <h3 className="text-xl font-medium mt-6 mb-3">Your Choices</h3>
                                    <p>
                                        Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set
                                        your browser to remove or reject browser cookies. Please note that if you choose to remove or reject
                                        cookies, this could affect the availability and functionality of our Services.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.retention = el)} id="retention" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        6
                                    </span>
                                    Data Retention
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        We store the information we collect about you for as long as is necessary for the purpose(s) for
                                        which we originally collected it. We may retain certain information for legitimate business purposes
                                        or as required by law.
                                    </p>
                                    <p className="mt-4">
                                        For example, we will retain your account information, order history, and body measurements for as
                                        long as you maintain an active account with us. If you close your account, we may still retain
                                        certain information for analytical purposes and recordkeeping integrity, as well as to prevent
                                        fraud, resolve disputes, enforce our Terms of Service or other policies, or take actions we deem
                                        necessary.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.security = el)} id="security" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        7
                                    </span>
                                    Security Measures
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        We take reasonable measures to help protect information about you from loss, theft, misuse,
                                        unauthorized access, disclosure, alteration, and destruction. However, no internet or electronic
                                        communications service is ever completely secure or error-free.
                                    </p>
                                    <p className="mt-4">Our security measures include:</p>
                                    <ul className="list-disc pl-6 mt-2 space-y-2">
                                        <li>Encryption of sensitive information using secure socket layer technology (SSL)</li>
                                        <li>Regular security assessments and penetration testing</li>
                                        <li>Access controls for our systems and databases</li>
                                        <li>Employee training on security and privacy practices</li>
                                        <li>Physical security measures at our facilities</li>
                                    </ul>
                                    <p className="mt-4">
                                        You are responsible for maintaining the secrecy of your unique password and account information, and
                                        for controlling access to your email communications from DarziXpress. We recommend using a strong,
                                        unique password for your DarziXpress account and changing it periodically.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.thirdparty = el)} id="thirdparty" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        8
                                    </span>
                                    Third-Party Links
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        Our Services may contain links to other websites, products, or services that we do not own or
                                        operate. We are not responsible for the privacy practices of these third parties. Please be aware
                                        that this Privacy Policy does not apply to your activities on these third-party services or any
                                        information you disclose to these third parties.
                                    </p>
                                    <p className="mt-4">
                                        We encourage you to read their privacy policies before providing any information to them.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.updates = el)} id="updates" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        9
                                    </span>
                                    Updates To This Policy
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        We may update this Privacy Policy from time to time in response to changing legal, technical, or
                                        business developments. When we update our Privacy Policy, we will take appropriate measures to
                                        inform you, consistent with the significance of the changes we make.
                                    </p>
                                    <p className="mt-4">
                                        We will obtain your consent to any material Privacy Policy changes if and where this is required by
                                        applicable data protection laws. You can see when this Privacy Policy was last updated by checking
                                        the "Last Updated" date displayed at the top of this Privacy Policy.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.contact = el)} id="contact" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        10
                                    </span>
                                    Contact Us
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        If you have any questions or concerns about this Privacy Policy or our privacy practices, please
                                        contact us at <i>(please don't actually contact us, this website is only a university project).</i>:
                                    </p>
                                    <ul className="list-disc pl-6 mt-4 space-y-2">
                                        <li>
                                            Address: 123 Tailoring Lane, Fashion District, NY 10001
                                        </li>
                                        <li>
                                            Email: privacy@darzixpress.com
                                        </li>
                                        <li>
                                            Phone: (555) 123-4567
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div ref={(el) => (sectionRefs.current.rights = el)} id="rights" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        11
                                    </span>
                                    Your Privacy Rights
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        Depending on your location, you may have certain rights regarding your personal information. These
                                        may include:
                                    </p>
                                    <ul className="list-disc pl-6 mt-4 space-y-2">
                                        <li>
                                            <strong>Access:</strong> You can request a copy of the personal information we hold about you.
                                        </li>
                                        <li>
                                            <strong>Correction:</strong> You can ask us to correct inaccurate or incomplete information.
                                        </li>
                                        <li>
                                            <strong>Deletion:</strong> You can ask us to delete your personal information in certain
                                            circumstances.
                                        </li>
                                        <li>
                                            <strong>Restriction:</strong> You can ask us to restrict the processing of your information in
                                            certain circumstances.
                                        </li>
                                        <li>
                                            <strong>Data Portability:</strong> You can ask us to transfer your information to another service
                                            provider in a structured, commonly used, and machine-readable format.
                                        </li>
                                        <li>
                                            <strong>Objection:</strong> You can object to our processing of your information in certain
                                            circumstances.
                                        </li>
                                        <li>
                                            <strong>Withdrawal of Consent:</strong> Where we rely on your consent to process your information,
                                            you can withdraw your consent at any time.
                                        </li>
                                    </ul>
                                    <p className="mt-4">
                                        To exercise any of these rights, please contact us using the contact information provided below. We
                                        may need to verify your identity before responding to your request.
                                    </p>
                                    <p className="mt-4">
                                        Please note that some of these rights may be limited where we have compelling legitimate grounds or
                                        legal obligations to process your personal information.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Alert className="p-6 max-w-[600px] min-w-[200px] mx-auto" variant="destructive">
                            <AlertCircle className="h-5 w-5 mt-2" />
                            <AlertTitle>
                                Disclaimer:</AlertTitle>
                            <AlertDescription>
                                This website is only a University Project. None of the policies written here actually apply.
                            </AlertDescription>
                        </Alert>
                    </div>

                    <div className="lg:col-span-1 order-1 lg:order-2">
                        <div className="sticky top-8">
                            <h3 className="text-sm font-medium text-gray-500 mb-4">On this page</h3>
                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`block w-full text-left py-2 text-sm transition-colors ${activeSection === section.id
                                            ? "text-rose-600 border-l-2 border-rose-600 pl-3 -ml-[2px]"
                                            : "text-gray-600 hover:text-gray-900 pl-3"
                                            }`}
                                    >
                                        {section.title}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(PrivacyPolicy)