import { useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import UatLayout from "@/Layouts/UatLayout";
import DOMPurify from "dompurify";

export default function View() {
    const { message } = usePage().props as any;
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const currentUrl = window.location.href; // Get current URL

    const handlePasswordSubmit = async () => {
        if (loading) return;
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(route("secured-message.verify", { id: message.id }), { password });

            if (response.data.success) {
                setDecryptedMessage(response.data.decrypted_message);
            } else {
                setError("Incorrect password.");
            }
        } catch (error: any) {
            setError(error.response?.data?.error || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyUrl = () => {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
            // Modern Clipboard API
            navigator.clipboard.writeText(currentUrl)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                })
                .catch(() => alert("Failed to copy URL"));
        } else {
            // Fallback for unsupported browsers
            const textArea = document.createElement("textarea");
            textArea.value = currentUrl;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            } catch (err) {
                alert("Failed to copy URL");
            }
            document.body.removeChild(textArea);
        }
    };
    

    return (
        <UatLayout>
            <div className="flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                 

                    {decryptedMessage ? (
                        
                        <div>
                            
                            <h1 className="text-2xl font-bold text-gray-800">Secured Message</h1>
                            <div
                                className="mt-4 p-4 border rounded bg-gray-50 text-gray-700 shadow-sm"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decryptedMessage) }}
                            />
                        </div>
                    ) : (
                        <div>
                               {/* Display Current URL with Copy Button */}
                            <div className="mb-4 p-3 bg-gray-100 border rounded-lg flex items-center justify-between">
                                <span className="text-sm text-gray-700 truncate">{currentUrl}</span>
                                <button
                                    className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition"
                                    onClick={handleCopyUrl}
                                >
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Enter Password</h2>
                            <input
                                type="password"
                                className="mt-3 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                                placeholder="Enter your password"
                            />
                            <button
                                className="mt-4 w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition disabled:bg-blue-300"
                                onClick={handlePasswordSubmit}
                                disabled={loading}
                            >
                                {loading ? "Verifying..." : "Submit"}
                            </button>
                            {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
                        </div>
                    )}
                </div>
            </div>
        </UatLayout>
    );
}
