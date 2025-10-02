import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/Card";
import { Badge } from "../Components/ui/Badge";
import logo from '../assets/logo-rose.png';

export default function TermsPage() {
  const [tab, setTab] = useState("terms"); // "terms" | "privacy"

  const section = (id, title, children) => (
    <section id={id} className="pt-6 pb-8">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {children}
      </div>
    </section>
  );

  const lastUpdated = "1 October 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
      {/* Nav */}
      <nav className="border-b-4 border-red-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <img src={logo} alt="logo" className="h-8 w-6 sm:h-12 sm:w-8 text-red-600" />
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Tulips & Ties
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="outline" className="px-3 py-1 text-sm text-red-600 border-2 border-red-400 rounded-lg cursor-pointer">
                Home
              </Button>
            </Link>
            <Link to="/login">
              <Button className="px-4 py-1 text-sm text-white bg-gradient-to-r from-rose-600 to-rose-500 rounded-lg cursor-pointer">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-4 bg-red-100 text-red-700 border-red-200 text-sm font-bold py-1 px-3">
            Legal documents
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-black mb-3 text-balance leading-tight">
            Terms of Service & Privacy Policy (GDPR)
          </h1>
          <p className="text-sm sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Please read these documents carefully. They explain your rights, our obligations, and how we process personal data under the General Data Protection Regulation (GDPR).
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-3 sm:px-4 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left column - tabs */}
          <aside className="lg:col-span-1">
            <Card className="p-0 bg-white border-2 border-red-200">
              <CardHeader className="p-4">
                <CardTitle className="text-base sm:text-lg">Documents</CardTitle>
                <p className="text-xs text-gray-500 mt-1">Choose the document to view</p>
              </CardHeader>

              <CardContent className="p-4 space-y-3">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setTab("terms")}
                    className={`text-left px-3 py-2 rounded-lg transition-colors ${
                      tab === "terms" ? "bg-rose-50 border border-rose-200 font-semibold" : "hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    Terms of Service
                  </button>

                  <button
                    onClick={() => setTab("privacy")}
                    className={`text-left px-3 py-2 rounded-lg transition-colors ${
                      tab === "privacy" ? "bg-rose-50 border border-rose-200 font-semibold" : "hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    Privacy Policy (GDPR)
                  </button>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Right column - content */}
          <section className="lg:col-span-3">
            <Card className="bg-white border-2 border-white shadow-lg">
              <CardContent className="p-6">
                {/* Meta */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {tab === "terms" ? "Terms of Service" : "Privacy Policy — GDPR"}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Last updated: <span className="font-medium">{lastUpdated}</span></p>
                  </div>
                  <div className="text-right">
                    <a href="#toc" className="text-sm text-rose-600 underline">Jump to contents</a>
                  </div>
                </div>

                {/* Table of contents */}
                <nav id="toc" className="mb-6">
                  <ul className="flex gap-3 text-xs sm:text-sm text-gray-600 flex-wrap">
                    <li><a href="#overview" className="underline">Overview</a></li>
                    <li><a href="#user-obligations" className="underline">User obligations</a></li>
                    <li><a href="#content" className="underline">Content & IP</a></li>
                    <li><a href="#liability" className="underline">Liability</a></li>
                    <li><a href="#gdpr" className="underline">GDPR summary</a></li>
                    <li><a href="#contact" className="underline">Contact</a></li>
                  </ul>
                </nav>

                {/* Terms content */}
                {tab === "terms" ? (
                  <article>
                    {section("overview", "Overview", <>
                      These Terms of Service ("Terms") govern your access to and use of the Tulips & Ties web application ("Service"). By using the Service you agree to these Terms in full.
                    </>)}

                    {section("user-obligations", "User obligations", <>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Users must be at least 16 years old, or have parental/guardian consent where applicable.</li>
                        <li>You agree not to use the Service for illegal purposes or to post malicious, abusive, or infringing content.</li>
                        <li>You are responsible for keeping your account credentials secure and for all actions taken under your account.</li>
                      </ul>
                    </>)}

                    {section("content", "Content and intellectual property", <>
                      <p>
                        All content provided on or through the Service (text, images, trademarks, code and other materials) is owned by Tulips & Ties or its licensors. You may not reproduce or distribute Service content without prior written permission.
                      </p>
                    </>)}

                    {section("liability", "Liability", <>
                      <p>
                        The Service is provided "as is" and "as available". Except where prohibited by law, Tulips & Ties disclaims all warranties and limits liability for direct, indirect or consequential damages to the maximum extent permitted by law.
                      </p>
                    </>)}

                    {section("termination", "Termination", <>
                      <p>
                        We may suspend or terminate access for users who breach these Terms or applicable law. Termination does not affect rights or obligations accrued before termination.
                      </p>
                    </>)}

                    {section("changes", "Changes to the Terms", <>
                      <p>
                        We may modify these Terms. We will publish the updated Terms on this page with a new "Last updated" date. Continued use after changes constitutes acceptance of the updated Terms.
                      </p>
                    </>)}
                  </article>
                ) : (
                  /* Privacy policy with GDPR specifics */
                  <article>
                    {section("overview", "Overview", <>
                      This Privacy Policy explains how Tulips & Ties ("we", "us", "our") collects, uses, discloses and protects personal data when you use the Service. It includes information about the legal bases for processing under the EU General Data Protection Regulation (GDPR).
                    </>)}

                    {section("controller", "Data controller and contact", <>
                      <p>
                        <strong>Data controller:</strong> Tulips & Ties (the entity operating this Service).<br/>
                        <strong>Contact:</strong> privacy@tulipsandties.example<br/>
                        If you wish to exercise your data subject rights listed below, please contact the address above.
                      </p>
                    </>)}

                    {section("data-collected", "Types of personal data we collect", <>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Account data:</strong> name, username, email address (if provided).</li>
                        <li><strong>Usage data:</strong> quiz results, scores, leaderboards, preferences, timestamps.</li>
                        <li><strong>Technical data:</strong> IP address, device type, browser, operating system, crash logs.</li>
                        <li><strong>Cookies and similar technologies:</strong> session cookies, functional cookies, analytics cookies.</li>
                      </ul>
                    </>)}

                    {section("legal-basis", "Legal bases for processing (GDPR)", <>
                      <p>
                        We process personal data only when we have a lawful basis to do so. Typical lawful bases we rely on include:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Performance of a contract:</strong> processing necessary to provide the Service (user account management, gameplay features).</li>
                        <li><strong>Legal obligation:</strong> where required by law (e.g. tax, court orders).</li>
                        <li><strong>Legitimate interests:</strong> for security, fraud prevention, analytics and service improvement (we balance these interests with user rights).</li>
                        <li><strong>Consent:</strong> where required (e.g. non-essential cookies, marketing communications). You may withdraw consent at any time.</li>
                      </ul>
                    </>)}

                    {section("purposes", "Purposes of processing", <>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Provide and operate the Service, including user registration and account management.</li>
                        <li>Personalize content and display leaderboards and statistics.</li>
                        <li>Communicate updates, security notices, and important Service messages.</li>
                        <li>Perform analytics to improve features, stability and user experience.</li>
                        <li>Detect, prevent and respond to security incidents and abuse.</li>
                      </ul>
                    </>)}

                    {section("sharing", "Data sharing and processors", <>
                      <p>
                        We do not sell personal data. We may share personal data with:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Service providers:</strong> hosting, email delivery, analytics providers, payment processors (when applicable). These providers act as data processors under contract and are required to protect your data.</li>
                        <li><strong>Legal requests:</strong> when required by law, regulation or to protect rights and safety.</li>
                        <li><strong>Aggregated or anonymized data:</strong> for analytics and research purposes that cannot be used to identify you.</li>
                      </ul>
                    </>)}

                    {section("transfers", "International data transfers", <>
                      <p>
                        Some of our processors may be located outside the European Economic Area (EEA). Where we transfer data outside the EEA, we ensure appropriate safeguards such as Standard Contractual Clauses (SCCs) or rely on adequacy decisions by the European Commission. Contact us for details about your specific transfers.
                      </p>
                    </>)}

                    {section("retention", "Data retention", <>
                      <p>
                        We keep personal data only for as long as necessary for the purposes described above, or to satisfy legal, accounting or reporting obligations. Retention periods vary depending on the type of data and legal requirements.
                      </p>
                    </>)}

                    {section("security", "Security of personal data", <>
                      <p>
                        We implement reasonable technical and organizational measures to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. However, no system is completely secure — if you suspect a data breach, contact us immediately.
                      </p>
                    </>)}

                    {section("cookies", "Cookies and similar technologies", <>
                      <p>
                        We use cookies and similar technologies to operate the Service, enable certain functionality, and collect analytics. Cookies fall into categories:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Strictly necessary:</strong> required for the Service to function.</li>
                        <li><strong>Functional:</strong> remember preferences and settings.</li>
                        <li><strong>Analytics/Performance:</strong> help us understand usage patterns (may require consent).</li>
                      </ul>
                      <p className="mt-2">
                        You can control cookie settings through your browser and, where available, within the Service. Blocking some cookies may affect functionality.
                      </p>
                    </>)}

                    {section("rights", "Your rights under GDPR", <>
                      <p>
                        If you are in the EU/EEA, you have certain rights regarding your personal data:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Right of access:</strong> request a copy of the personal data we hold about you.</li>
                        <li><strong>Right to rectification:</strong> request correction of inaccurate or incomplete data.</li>
                        <li><strong>Right to erasure ("right to be forgotten"):</strong> request deletion of your personal data in certain circumstances.</li>
                        <li><strong>Right to restrict processing:</strong> request limitation of processing in certain situations.</li>
                        <li><strong>Right to data portability:</strong> request a machine-readable copy of data you provided to us.</li>
                        <li><strong>Right to object:</strong> object to processing based on legitimate interests or direct marketing.</li>
                        <li><strong>Right to withdraw consent:</strong> where processing is based on consent, you may withdraw it at any time.</li>
                      </ul>
                      <p className="mt-2">
                        To exercise any of these rights, contact us at <a className="text-rose-600 underline" href="mailto:privacy@tulipsandties.example">privacy@tulipsandties.example</a>. You also have the right to lodge a complaint with a supervisory authority (for example, an EU member state's data protection authority).
                      </p>
                    </>)}

                    {section("dpo", "Data Protection Officer (DPO) / Representative", <>
                      <p>
                        If applicable, our Data Protection Officer or EU representative contact is: <br/>
                        <strong>privacy@tulipsandties.example</strong><br/>
                        (If we appoint an official DPO or EU representative, we will publish their contact details here.)
                      </p>
                    </>)}

                    {section("automated", "Automated decision-making & profiling", <>
                      <p>
                        We do not perform automated decision-making or profiling that produces legal effects concerning you. If we introduce such processing in the future, we will provide clear information and obtain any legally required consents.
                      </p>
                    </>)}

                    {section("children", "Children", <>
                      <p>
                        Our Service is not directed to children under 16. If you are under 16, please do not provide personal data without parental or guardian consent. If we learn that we have collected personal data from a child under 16 without consent, we will take steps to delete it.
                      </p>
                    </>)}

                    {section("changes", "Changes to this Privacy Policy", <>
                      <p>
                        We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will post updates on this page with a new "Last updated" date. Where required by law, we will notify you directly of material changes.
                      </p>
                    </>)}
                  </article>
                )}

                {/* Contact */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Contact</h4>
                  <p className="text-sm text-gray-600">
                    For questions about these Terms or the Privacy Policy (including GDPR requests), contact: <a href="mailto:privacy@tulipsandties.example" className="text-rose-600 underline">privacy@tulipsandties.example</a>.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Disclaimer:</strong> This document is a template for general informational purposes and does not constitute legal advice. For a legally binding policy tailored to your business and jurisdiction, consult a qualified legal professional.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-6 sm:mt-8 border-t border-red-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 text-xs sm:text-sm font-medium text-center md:text-right">
              © {new Date().getFullYear()} Tulips & Ties • All rights reserved.
            </p>
            <div className="flex gap-3 mt-3 md:mt-0">
              <Link to="/terms" className="text-xs text-gray-600 underline">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
