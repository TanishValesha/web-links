import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ExternalLinkIcon, TrashIcon, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";

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

const LinkGrid = ({ triggerReload }: { triggerReload: number }) => {
  const [savedLinks, setSavedLinks] = useState<SavedLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  useEffect(() => {
    loadSavedLinks();
  }, [triggerReload]);

  const loadSavedLinks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/link`,
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const links = await response.json();
      setSavedLinks(links);
    } catch (error) {
      console.error("Error loading saved links:", error);
      toast("Failed to load saved links");
    }
    setIsLoading(false);
  };

  const deleteLink = (id: number) => {
    const updatedLinks = savedLinks.filter((link) => link.id !== id);
    setSavedLinks(updatedLinks);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/link/${id}`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete link");
        }
      })
      .catch((error) => {
        console.error("Error deleting link:", error);
        toast("Failed to delete link");
      });

    toast.success("Link removed from your collection");
  };

  const openLink = (id: number) => {
    navigate(`/link/${id}`);
  };

  if (savedLinks.length === 0 && !isLoading) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ImageIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No saved links yet
        </h3>
        <p className="text-gray-600 mb-6">
          Start building your link collection by adding your first link
        </p>
        <p className="text-sm text-gray-500">
          Click "Add New Link" to get started
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col space-y-3 text-center justify-center items-baseline py-16"
          >
            <div className="relative flex justify-center">
              <Skeleton className="h-[200px] w-[400px] rounded-xl" />
              <ImageIcon className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300" />
            </div>
            <div className="space-y-2 flex-col">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedLinks.map((link) => (
        <Card
          key={link.id}
          onClick={() => {
            if (isMobile) {
              openLink(link.id);
            }
          }}
          className="group hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white"
        >
          <CardContent className="p-0">
            {/* Image Section */}
            <div className="aspect-video bg-gray-100  rounded-t-lg overflow-hidden relative">
              {link.image ? (
                <img
                  src={link.image}
                  alt={link.title}
                  className="w-full h-full object-cover hover:scale-103 transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-300" />
                </div>
              )}

              {/* Action buttons overlay */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openLink(link.id)}
                  className="bg-white/90 hover:bg-white text-gray-700 shadow-sm"
                >
                  <ExternalLinkIcon className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => deleteLink(link.id)}
                  className="bg-white/90 hover:bg-red-50 text-red-600 shadow-sm"
                >
                  <TrashIcon className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                {link.title}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-2 mb-3 overflow-ellipsis">
                {link.summary || "No description available for this link."}
              </p>

              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {link.domain}
                </Badge>

                <span className="text-xs text-gray-500">
                  {new Date(link.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-2 mb-3 pl-4">
              {link.tags.length > 0 &&
                link.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="text-xs mt-2 bg-indigo-600 text-white"
                  >
                    {tag.replace(/_/g, " ")}
                  </Badge>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LinkGrid;
