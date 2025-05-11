"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useState, useEffect, useRef, memo } from "react"

function TermsOfService() {
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
        { id: "introduction", title: "Acceptance of Terms" },
        { id: "description", title: "Description of Service" },
        { id: "fairuse", title: "Fair Use" },
        { id: "intellectual", title: "Intellectual Property Rights" },
        { id: "ownership", title: "Tags Ownership" },
        { id: "fees", title: "Commissions, fees, and taxes" },
        { id: "changes", title: "Changes to these Terms" },
        { id: "contact", title: "Contact Information" },
        { id: "disclaimer", title: "Disclaimer of Warranties" },
        { id: "liability", title: "Limitation of Liability" },
        { id: "governing", title: "Governing Law and Jurisdiction" },
    ]

    return (
        <div className="min-h-screen bg-white my-8">
            <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-semibold text-center mb-16">Terms of Service</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-3 order-2 lg:order-1">
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-600 mb-8">
                                Subject to these Terms of Service (this "Agreement"), <strong>DarziXpress</strong> ("DarziXpress", "we",
                                "us" and/or "our") provides access to DarziXpress's online tailoring platform as a service
                                (collectively, the "Services"). By using or accessing the Services, you acknowledge that you have read,
                                understand, and agree to be bound by this Agreement.
                            </p>

                            <p className="text-gray-600 mb-12">
                                If you are entering into this Agreement on behalf of a company, business or other legal entity, you
                                represent that you have the authority to bind such entity to this Agreement, in which case the term
                                "you" shall refer to such entity. If you do not have such authority, or if you do not agree with this
                                Agreement, you must not accept this Agreement and may not use the Services.
                            </p>

                            <div ref={(el) => (sectionRefs.current.introduction = el)} id="introduction" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        1
                                    </span>
                                    Acceptance of Terms
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        By signing up and using the services provided by DarziXpress (referred to as the "Service"), you are
                                        agreeing to be bound by the following terms and conditions ("Terms of Service"). The Service is
                                        owned and operated by DarziXpress ("Us", "We", or "Our").
                                    </p>
                                    <p className="mt-4">
                                        DarziXpress reserves the right to update and change these Terms of Service without notice. Any new
                                        features that augment or enhance the current Service, including the release of new tools and
                                        resources, shall be subject to these Terms of Service.
                                    </p>
                                    <p className="mt-4">
                                        Continued use of the Service after any such changes shall constitute your consent to such changes.
                                        You can review the most current version of the Terms of Service at any time at this page.
                                    </p>
                                </div>
                            </div>
                            <div ref={(el) => (sectionRefs.current.description = el)} id="description" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        2
                                    </span>
                                    Description of Service
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        DarziXpress is an online platform that connects customers with professional tailors for custom
                                        clothing and alteration services. Our services include but are not limited to:
                                    </p>
                                    <ul className="list-disc pl-6 mt-4 space-y-2">
                                        <li>Custom tailoring of clothing items based on user measurements and specifications</li>
                                        <li>Alteration services for existing garments</li>
                                        <li>Fabric selection and consultation</li>
                                        <li>Measurement guidance and storage</li>
                                        <li>Delivery and pickup of garments</li>
                                    </ul>
                                    <p className="mt-4">
                                        The availability of specific services may vary by location. DarziXpress reserves the right to
                                        modify, suspend, or discontinue any aspect of the Service at any time.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.fairuse = el)} id="fairuse" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        3
                                    </span>
                                    Fair Use
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        You are responsible for maintaining the security of your account and password. DarziXpress cannot
                                        and will not be liable for any loss or damage from your failure to comply with this security
                                        obligation.
                                    </p>
                                    <p className="mt-4">
                                        You may not use the Service for any illegal or unauthorized purpose. You must not, in the use of the
                                        Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
                                    </p>
                                    <p className="mt-4">Prohibited uses include but are not limited to:</p>
                                    <ul className="list-disc pl-6 mt-4 space-y-2">
                                        <li>Requesting tailoring of counterfeit designer items</li>
                                        <li>Harassment of tailors or other users</li>
                                        <li>Submitting false or misleading information</li>
                                        <li>Attempting to gain unauthorized access to other users' accounts</li>
                                        <li>Using the service to distribute unsolicited promotional content</li>
                                    </ul>
                                    <p className="mt-4">
                                        We reserve the right to suspend or terminate your access to the Service if we determine, in our sole
                                        discretion, that you have violated these Terms of Service.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.intellectual = el)} id="intellectual" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        4
                                    </span>
                                    Intellectual Property Rights
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        You acknowledge and agree that the Service and its entire contents, features, and functionality,
                                        including but not limited to all information, software, code, text, displays, graphics, photographs,
                                        video, audio, design, presentation, selection, and arrangement, are owned by DarziXpress, our
                                        licensors, or other providers of such material and are protected by United States and international
                                        copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights
                                        laws.
                                    </p>
                                    <p className="mt-4">
                                        By signing up for the Service, you agree that we may use your company name and logo in our marketing
                                        materials.
                                    </p>
                                    <p className="mt-4">
                                        The DarziXpress name, logo, and all related names, logos, product and service names, designs, and
                                        slogans are trademarks of DarziXpress or its affiliates or licensors. You must not use such marks
                                        without the prior written permission of DarziXpress.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.ownership = el)} id="ownership" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        5
                                    </span>
                                    Tags Ownership
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        If you're using a DarziXpress tag, you acknowledge that DarziXpress owns all rights, title, and interest
                                        in and to all such tags.
                                    </p>
                                    <p className="mt-4">
                                        DarziXpress reserves the right to reclaim any DarziXpress tag at any time and for any
                                        reason.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.fees = el)} id="fees" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        6
                                    </span>
                                    Commissions, fees, and taxes
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        The use of DarziXpress services requires payment of fees as specified on our website or mobile
                                        application. All fees are quoted in the local currency applicable to your location.
                                    </p>
                                    <p className="mt-4">
                                        Payment methods accepted include credit cards, debit cards, and other payment methods as specified
                                        on the Service. By providing payment information, you represent and warrant that you are authorized
                                        to use the designated payment method.
                                    </p>
                                    <p className="mt-4">
                                        DarziXpress reserves the right to change its fees and payment policies at any time. Any changes to
                                        fees will be communicated to users through the Service or via email.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.changes = el)} id="changes" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        7
                                    </span>
                                    Changes to these Terms
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        DarziXpress reserves the right, at its sole discretion, to modify or replace these Terms at any
                                        time. We will provide notice of any changes by posting the new Terms on this page and updating the
                                        "Last Updated" date.
                                    </p>
                                    <p className="mt-4">
                                        Your continued use of the Service after any such changes constitutes your acceptance of the new
                                        Terms. If you do not agree to the new Terms, you must stop using the Service.
                                    </p>
                                    <p className="mt-4">
                                        It is your responsibility to review these Terms periodically for changes. We encourage you to check
                                        this page frequently for any changes to stay informed about our legal agreements with you.
                                    </p>
                                </div>
                            </div>
                            <div ref={(el) => (sectionRefs.current.contact = el)} id="contact" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        8
                                    </span>
                                    Contact Information
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>If you have any questions about these Terms, please contact us at <i>(please don't actually contact us, this website is only a university project)</i>:</p>
                                    <ul className="list-disc pl-6 mt-4 space-y-2">
                                        <li>Email: support@darzixpress.com</li>
                                        <li>Address: 123 Tailoring Lane, Fashion District, NY 10001</li>
                                        <li>Phone: (555) 123-4567</li>
                                    </ul>
                                </div>
                            </div>
                            <div ref={(el) => (sectionRefs.current.disclaimer = el)} id="disclaimer" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        9
                                    </span>
                                    Disclaimer of Warranties
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                                        IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                                        PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
                                    </p>
                                    <p className="mt-4">
                                        DarziXpress, its subsidiaries, affiliates, and licensors do not warrant that: (a) the Service will
                                        function uninterrupted, secure, or available at any particular time or location; (b) any errors or
                                        defects will be corrected; (c) the Service is free of viruses or other harmful components; or (d)
                                        the results of using the Service will meet your requirements.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.liability = el)} id="liability" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        10
                                    </span>
                                    Limitation of Liability
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        IN NO EVENT SHALL DARZIXPRESS, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES
                                        BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
                                        WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING
                                        FROM:
                                    </p>
                                    <ul className="list-disc pl-6 mt-4 space-y-2">
                                        <li>Your access to or use of or inability to access or use the Service</li>
                                        <li>Any conduct or content of any third party on the Service</li>
                                        <li>Any content obtained from the Service</li>
                                        <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                                    </ul>
                                    <p className="mt-4">
                                        The foregoing limitation of liability shall apply to the fullest extent permitted by law in the
                                        applicable jurisdiction.
                                    </p>
                                </div>
                            </div>

                            <div ref={(el) => (sectionRefs.current.governing = el)} id="governing" className="mb-12">
                                <h2 className="text-2xl font-medium flex items-center">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                                        11
                                    </span>
                                    Governing Law and Jurisdiction
                                </h2>
                                <div className="mt-4 pl-8">
                                    <p>
                                        These Terms shall be governed by and construed in accordance with the laws and legal principles applicable in the jurisdiction in which the Service is being accessed or used, without regard to any conflict of law rules that might result in the application of the laws of a different jurisdiction. By using the Service, you acknowledge and agree that it is your responsibility to ensure compliance with the local laws and regulations applicable to you.
                                    </p>
                                    <p className="mt-4">
                                        Our failure to enforce any provision or right under these Terms shall not be interpreted as a waiver of such provision or right. Any waiver of any provision will be effective only if it is in writing and signed by an authorized representative of our organization. No single or partial exercise of any right, power, or remedy will preclude any other or further exercise of the same or any other right, power, or remedy.
                                    </p>
                                    <p className="mt-4">
                                        If any part of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue to be valid and enforceable to the fullest extent permitted by law. The unenforceable portion shall be modified, interpreted, or severed as necessary to reflect the original intent of the parties as closely as possible.
                                    </p>
                                    <p className="mt-4">
                                        These Terms constitute the complete and exclusive understanding and agreement between you and us with respect to the use of the Service, superseding all prior or contemporaneous communications, proposals, representations, and agreements, whether oral or written. No agency, partnership, joint venture, or employment relationship is created as a result of these Terms, and you do not have any authority of any kind to bind us in any respect.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Alert className="p-6 max-w-[600px] min-w-[200px] mx-auto" variant="destructive">
                            <AlertCircle className="h-5 w-5 mt-2" />
                            <AlertTitle>
                                Disclaimer:</AlertTitle>
                            <AlertDescription>
                                This website is only a University Project. None of the terms written here actually apply.
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

export default memo(TermsOfService)