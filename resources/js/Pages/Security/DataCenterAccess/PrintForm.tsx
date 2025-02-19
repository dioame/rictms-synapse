import React, { useState } from "react";

const DataCenterVisitorForm = ({result} : any) => {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "long" });

    const [formData, setFormData] = useState({
        visitorName: "",
        date: "",
      });
    
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e:any) => {
        e.preventDefault();
        alert("Form submitted successfully!");
        console.log(formData);
      };


      const getDayWithSuffix = () => {
        const day = new Date().getDate();
        const suffix = ["th", "st", "nd", "rd"];
        const value = day % 100;
        return day + (suffix[(value - 20) % 10] || suffix[value] || suffix[0]);
      };

      
  return (
    <div className="">
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-300 p-4 print:border-0">
      <h2 className="text-xl font-bold text-center mb-4">DATA CENTER VISITORS' ACCESS FORM</h2>
      
      {/* Visitor Information */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">1. Visitor Information</h3>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">Name:</td>
              <td className="border px-4 py-2">{result.name}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Company Name:</td>
              <td className="border px-4 py-2">{result.company_name}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Contact Number:</td>
              <td className="border px-4 py-2">{result.contact_number}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Email Address:</td>
              <td className="border px-4 py-2">{result.email_address}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Purpose of Visit:</td>
              <td className="border px-4 py-2">{result.purpose_of_visit}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Date of Visit:</td>
              <td className="border px-4 py-2">{result.date_of_visit}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Duration of Visit:</td>
              <td className="border px-4 py-2">{result.duration_of_visit}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Proof of Identity Presented:</td>
              <td className="border px-4 py-2">{result.proof_of_identity_presented}</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      {/* Visitor Compliance Checks */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">2. Visitor Compliance Checks</h3>
        <table className="w-full border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-200">
            <th className="border px-4 py-2">Item</th>
            <th className="border px-4 py-2 w-1/6">Status (✔/✖)</th>
            <th className="border px-4 py-2 w-1/2">Comments</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td className="border px-4 py-2">Proof of Identity</td>
            <td className="border px-4 py-2 w-1/6"></td>
            <td className="border px-4 py-2 w-1/2"></td>
            </tr>
            <tr>
            <td className="border px-4 py-2">Confidentiality Undertaking Form</td>
            <td className="border px-4 py-2 w-1/6"></td>
            <td className="border px-4 py-2 w-1/2"></td>
            </tr>
            <tr>
            <td className="border px-4 py-2">Briefing on Safety Procedures</td>
            <td className="border px-4 py-2 w-1/6"></td>
            <td className="border px-4 py-2 w-1/2"></td>
            </tr>
        </tbody>
        </table>

      </section>
      
      {/* Access Approval */}
      <section>
        <h3 className="text-lg font-semibold mb-2">3. Access Approval</h3>
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold text-center">Endorsed by:</td>
              <td className="border px-4 py-2 font-semibold text-center">Approved by:</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 ">&nbsp;</td>
              <td className="border px-4 py-2">&nbsp;</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-center">
              (SIGNATURE OVER PRINTED NAME) <br />Data Center Management Officer, ICTMS
              </td>
              <td className="border px-4 py-2 text-center">
              (SIGNATURE OVER PRINTED NAME) <br />Data Center Administrator

              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>

    {/* NEXT */}
    <div style={{ pageBreakBefore: "always", breakBefore: "page" }}></div>


    <div className="max-w-4xl mx-auto p-8  bg-white text-sm border border-gray-300 p-4 print:border-0">
      <h2 className="text-center text-xl font-bold mb-4 uppercase">Confidentiality Undertaking</h2>
      <p className="text-justify">
        This Confidentiality Undertaking (“Undertaking”) is made and entered into as of this
        &nbsp;<u>{getDayWithSuffix()}</u> &nbsp; day of <u>{month}</u>, <u>{year}</u>, by and between the Department of Social Welfare and
        Development Information and Communication Technology Management Services - Infrastructure
        Management Division (“DSWD ICTMS-IMD”) and <u>{result.company_name}</u> (herein referred
        to as the “Visitor”).
      </p>

      <h3 className="font-bold mt-6">1. CONFIDENTIAL INFORMATION</h3>
      <p className="text-justify">
        The Visitor is interested in obtaining information from the Department of Social Welfare and
        Development Information and Communication Technology Management Services Data Center Operations
        and ICT Infrastructure (“Project”), which includes the design, maintenance, security, and expansion
        of data center facilities and ICT services. The Visitor acknowledges that DSWD ICTMS-IMD has the
        exclusive right to determine what information it may furnish to the Visitor.
      </p>
      <ul className="list-disc pl-6">
        <li>The DSWD ICTMS-IMD Data Center’s architecture, security measures, and ICT infrastructure.</li>
        <li>Information shared during any site visits.</li>
        <li>
          Written, electronic, or oral information disclosed to the Visitor, including data storage,
          operational processes, or disaster recovery plans.
        </li>
        <li>Any analyses or reports prepared by the Visitor that include Confidential Information.</li>
      </ul>

      <h3 className="font-bold mt-6">2. NO REPRESENTATION</h3>
      <p className="text-justify">
        The Visitor acknowledges that DSWD ICTMS-IMD and its representatives do not make any representations
        or warranties regarding the accuracy or completeness of the Confidential Information.
      </p>

      <h3 className="font-bold mt-6">3. VISITOR’S OBLIGATIONS</h3>
      <ul className="list-decimal pl-6">
        <li>To use the Confidential Information solely for the purpose of evaluating or supporting the Project.</li>
        <li>
          To protect the Confidential Information with the same degree of care as it would its own
          confidential information.
        </li>
        <li>
          To limit access to the Confidential Information only to authorized representatives involved in
          the Project.
        </li>
      </ul>

      <h3 className="font-bold mt-6">4. COMMUNICATIONS WITH OTHER PARTIES</h3>
      <p className="text-justify">
        The Visitor shall not, without prior written consent, disclose or share Confidential Information
        with third parties, including other bidders or participants, except as required by applicable law.
      </p>

      <h3 className="font-bold mt-6">5. ACCESS TO THE DATA CENTER</h3>
      <p>Any physical or electronic access to the <strong>DSWD ICTMS-IMD</strong> Data Center by the Visitor or its representatives is subject to the following:</p>
      <ul className="list-disc pl-6 mt-2">
        <li>Adherence to security protocols implemented by the <strong>DSWD ICTMS-IMD</strong>.</li>
        <li>Immediate termination of access upon completion of the Project evaluation or disqualification from the bidding process.</li>
        <li>Acknowledgment that <strong>DSWD ICTMS-IMD</strong> is not responsible for technical issues during access.</li>
      </ul>

    </div>

    {/* NEXT */}
    <div style={{ pageBreakBefore: "always", breakBefore: "page" }}></div>

    <div className="max-w-4xl mx-auto p-6 border rounded-lg   bg-white print:border-0">
 
      
      
      <h3 className="font-bold mt-6">6. SECURITY</h3>
      <p className="text-justify">The Visitor shall ensure the security of any Confidential Information accessed, including:</p>
      <ul className="list-disc pl-6 mt-2">
        <li>Preventing unauthorized access to information while logged into any <strong>DSWD ICTMS-IMD</strong> systems.</li>
        <li>Ensuring proper log-out procedures after accessing data or facilities.</li>
      </ul>
      
      
      <h3 className="font-bold mt-6">7. GOVERNING LAW AND VENUE</h3>
      <p className="text-justify">This Undertaking shall be governed by the laws of the Republic of the Philippines. Any disputes arising from this Undertaking shall be settled by the courts of Quezon City, Metro Manila, to the exclusion of all other venues.</p>
      
      <h3 className="font-bold mt-6">8. NO IMPLIED WAIVER</h3>
      <p className="text-justify">Failure by the <strong>DSWD ICTMS-IMD</strong> to enforce any provision of this Undertaking does not constitute a waiver of its right to enforce the same or any other provision at a later date.</p>
      
    
      <h3 className="font-bold mt-6">9. NO COMMITMENT</h3>
      <p className="text-justify">This Undertaking does not constitute a contract between the <strong>DSWD ICTMS-IMD</strong> and the Visitor. No agreement regarding the Project shall be deemed to exist unless formalized through a written contract.</p>
      
      <h3 className="font-bold mt-6">10. SEVERABILITY</h3>
      <p className="text-justify">If any term of this Undertaking is found to be invalid, the remaining terms shall continue in full force and effect.</p>
      
      <br />
      <p className="text-justify"><b className=" font-semibold mt-6">IN WITNESS WHEREOF</b> The parties have executed this Undertaking on this
      &nbsp;<u>{getDayWithSuffix()}</u> &nbsp; day of <u>{month}</u>, <u>{year}</u>, at the DSWD-ICTMS Office, 1st Floor, Malasakit Building, Batasan Road, DSWD Central Office, Constitution Hills, Batasan Complex, Quezon City.</p>
      <br />
      <div className="mt-8 flex justify-between">
        
        <div className="text-center">
          <p>{result.name.toUpperCase()}</p>
          <div className="border-t w-48 mx-auto"></div>
          <p className="mt-2">(Visitor)</p>
        </div>
        <div className="text-center">
          <div className="border-t w-48 mx-auto"></div>
          <p className="mt-2">DSWD ICTMS-IMD Representative</p>
        </div>
      </div>
      
 
    </div>
    </div>
    
  );
};



export default DataCenterVisitorForm;
