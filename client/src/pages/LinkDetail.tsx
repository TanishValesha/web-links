import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  ImageIcon,
  CalendarIcon,
  GlobeIcon,
  LoaderIcon,
  LogOutIcon,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface SavedLink {
  id: number;
  url: string;
  title: string;
  image: string;
  domain: string;
  tags: string[];
  summary: string;
  createdAt: string;
}

const LinkDetail = () => {
  const { linkId } = useParams<{ linkId: string }>();
  const navigate = useNavigate();
  const [link, setLink] = useState<SavedLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHeaderLoading, setIsHeaderLoading] = React.useState(false);

  useEffect(() => {
    if (linkId) {
      const fetchLink = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/link/${linkId}`,
            {
              method: "GET",
              credentials: "include",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch link details");
          }

          const data: SavedLink = await response.json();
          setLink(data);
        } catch (error) {
          console.error("Error fetching link details:", error);
          setLink(null);
        } finally {
          setIsLoading(false);
        }
      };

      fetchLink();
    }
  }, [linkId]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleOpenLink = () => {
    if (link) {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleLogout = async () => {
    setIsHeaderLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        toast.success("Logout successful!");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Logout failed.");
    }
    setIsHeaderLoading(false);
  };

  if (!link && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Link not found
          </h2>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <LoaderIcon className="w-7 h-7 text-indigo-600 animate-spin mr-2 inline-block" />
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="sm:block hidden">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                <span className="hidden md:block">Back to Dashboard</span>
              </Button>
            </div>
            <div className="flex justify-between items-center gap-2">
              <Button
                onClick={handleOpenLink}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                Open Link
              </Button>
              <Button
                variant="outline"
                disabled={isHeaderLoading}
                onClick={handleLogout}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
              >
                {isHeaderLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-white rounded-full animate-spin"></div>
                    <span>Logging out...</span>
                  </div>
                ) : (
                  <>
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Logout
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              {/* Hero Image */}
              <div className="aspect-video bg-gray-100 overflow-hidden">
                {link?.image ? (
                  <img
                    src={link.image}
                    alt={link.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <ImageIcon className="w-24 h-24 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {link?.title}
                  </h2>

                  <div className="flex items-center gap-4 mb-6">
                    <Badge
                      variant="secondary"
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 border-indigo-200"
                    >
                      <GlobeIcon className="w-3 h-3 mr-1" />
                      {link?.domain}
                    </Badge>

                    <div className="flex items-center text-gray-500 text-sm">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      Saved on{" "}
                      {new Date(link?.createdAt ?? "").toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center space-x-2 mb-3">
                  {link?.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="text-sm bg-indigo-600 mt-2 sm:mt-3 text-white"
                    >
                      {tag.replace(/_/g, " ")}
                    </Badge>
                  ))}
                </div>

                <div className="prose prose-gray max-w-none">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    Summary
                  </h2>
                  <ReactMarkdown>{link?.summary}</ReactMarkdown>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <strong>URL:</strong>
                      <a
                        href={link?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-indigo-600 hover:text-indigo-800 underline break-all"
                      >
                        {link?.url}
                      </a>
                    </div>
                    <Button
                      onClick={handleOpenLink}
                      size="lg"
                      className="bg-indigo-600 hover:bg-indigo-700 md:mt-0 mt-2"
                    >
                      <ExternalLinkIcon className="w-4 h-4 mr-2" />
                      Visit Link
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LinkDetail;
