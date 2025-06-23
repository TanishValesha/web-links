import {
  LinkIcon,
  SaveIcon,
  SearchIcon,
  GlobeIcon,
  BookmarkIcon,
} from "lucide-react";

const CreativeVisual = () => {
  return (
    <div className="relative w-full h-10 lg:h-96 flex items-center justify-center animate-fade-in">
      {/* Main circular design */}
      <div className="lg:block hidden relative w-96 h-96">
        {/* Central gradient orb representing the web */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-cyan-400 rounded-full blur-sm opacity-80 animate-pulse"></div>
        <div className="absolute inset-2 bg-gradient-to-tr from-cyan-300 via-blue-300 to-indigo-300 rounded-full blur-md opacity-60 animate-pulse delay-500"></div>
        <div className="absolute inset-8 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center">
          <GlobeIcon className="w-20 h-20 text-white/80" />
        </div>

        {/* Floating link-related icons */}
        <div className="absolute top-8 left-12 animate-float">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
            <LinkIcon className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="absolute top-16 right-8 animate-float delay-1000">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <SaveIcon className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="absolute bottom-12 left-8 animate-float delay-2000">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <SearchIcon className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="absolute bottom-8 right-16 animate-float delay-1500">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center shadow-lg">
            <BookmarkIcon className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Orbiting elements representing data flow */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "20s" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
          </div>
        </div>

        <div
          className="absolute inset-4 animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
          </div>
          <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Descriptive text for the app */}
      <div className="absolute md:-bottom-20 -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-br from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          LinkSaver
        </h2>
        <p className="text-gray-600 text-sm">
          Fetch, organize & save web links
        </p>
      </div>
    </div>
  );
};

export default CreativeVisual;
