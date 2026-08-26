import React from 'react';
import {
  Settings,
  RotateCcw,
  Save,
  X,
  CheckSquare,
  Square,
  CheckCircle,
  Circle,
  PlayCircle
} from 'lucide-react';
import { TopicItem } from '../../constants';

interface LearningAreaViewProps {
  categories: Record<string, TopicItem[]>;
  completedTopics: string[];
  onToggleTopicCompletion: (topicName: string) => void;
  onTopicClick: (topicName: string) => void;
  onSelectVideo: (videoId: string) => void;
  myTopics: string[];
  isSelectionMode: boolean;
  tempSelectedTopics: string[];
  onEnterSelectionMode: () => void;
  onSaveSelectedTopics: () => void;
  onCancelSelectionMode: () => void;
  onResetTopicSelection: () => void;
  onToggleTopicSelection: (topicName: string) => void;
}

// Rub el Hizb 8-point geometric star icon
const RubElHizbIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
      fillRule="evenodd"
    />
    <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" fillOpacity="0.3" />
  </svg>
);

export const LearningAreaView: React.FC<LearningAreaViewProps> = ({
  categories,
  completedTopics,
  onToggleTopicCompletion,
  onTopicClick,
  onSelectVideo,
  myTopics,
  isSelectionMode,
  tempSelectedTopics,
  onEnterSelectionMode,
  onSaveSelectedTopics,
  onCancelSelectionMode,
  onResetTopicSelection,
  onToggleTopicSelection,
}) => {
  const componentSelectionStyle = (isSelected: boolean) => {
    if (isSelected) {
      return 'bg-[#4A3728]/10 dark:bg-amber-500/20 border-2 border-[#4A3728] dark:border-amber-500 text-[#4A3728] dark:text-amber-500 font-bold shadow-md transform scale-[1.02]';
    }
    return 'bg-[#F0EAD6] dark:bg-slate-800 border-2 border-dashed border-[#8D6E63]/30 dark:border-slate-600 text-[#8D6E63] dark:text-gray-400 hover:border-[#4A3728]/50 dark:hover:border-amber-500/50 hover:bg-[#4A3728]/5 dark:hover:bg-amber-500/5';
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#5D4037]/10 dark:border-amber-500/20">
        <div>
          <h2 className="text-3xl font-messiri font-bold text-[#2C1810] dark:text-slate-100">
            The Archives of Knowledge
          </h2>
          <p className="text-[#8D6E63] dark:text-slate-400 font-markazi text-xl">
            Select a topic to begin your journey to eloquence.
          </p>
        </div>

        {/* Customization Toolbar */}
        <div className="flex items-center gap-3">
          {!isSelectionMode ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onEnterSelectionMode}
                className="flex items-center gap-2 px-4 py-2 bg-[#E6DEC8] dark:bg-slate-800 border border-[#D7Cea7] dark:border-slate-700 rounded-lg text-[#4A3728] dark:text-amber-500 hover:bg-[#D7Cea7] dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <Settings size={18} />
                <span className="font-messiri font-bold">Customize Topics</span>
              </button>
              {myTopics.length > 0 && (
                <button
                  onClick={onResetTopicSelection}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors shadow-sm"
                >
                  <RotateCcw size={18} />
                  <span className="font-messiri font-bold">Show All</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-2 animate-in zoom-in duration-300">
              <button
                onClick={onSaveSelectedTopics}
                className="flex items-center gap-2 px-6 py-2 bg-[#4A3728] dark:bg-amber-600 border border-[#2C1810] dark:border-amber-400 rounded-lg text-[#F0EAD6] dark:text-white hover:bg-[#2C1810] dark:hover:bg-amber-700 transition-colors shadow-lg scale-105"
              >
                <Save size={18} />
                <span className="font-messiri font-bold">
                  Save Selection ({tempSelectedTopics.length})
                </span>
              </button>
              <button
                onClick={onCancelSelectionMode}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
              >
                <X size={18} />
                <span className="font-messiri font-bold">Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
          isSelectionMode
            ? 'border-4 border-dashed border-[#4A3728]/20 dark:border-amber-500/30 p-4 rounded-2xl'
            : ''
        }`}
      >
        {Object.entries(categories).map(([category, items]) => (
          <div
            key={category}
            className={`bg-[#F0EAD6] dark:bg-slate-900 rounded-xl overflow-hidden border-2 border-[#5D4037]/10 dark:border-amber-500/20 shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] paper-torn group transition-all duration-300 ${
              !isSelectionMode
                ? 'hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                : ''
            }`}
          >
            <div className="bg-[#E6DEC8] dark:bg-slate-800/80 p-4 border-b border-[#5D4037]/10 dark:border-amber-500/10 flex items-center justify-between">
              <h3 className="font-messiri font-bold text-xl text-[#4A3728] dark:text-amber-500 uppercase tracking-widest">
                {category}
              </h3>
              <RubElHizbIcon size={20} className="text-[#5D4037]/40 dark:text-amber-500/40" />
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {items.map((t) => {
                  const isSelectedInMode = tempSelectedTopics.includes(t.name);
                  return (
                    <li key={t.name}>
                      <button
                        onClick={() => {
                          if (isSelectionMode) {
                            onToggleTopicSelection(t.name);
                          } else {
                            onTopicClick(t.name);
                          }
                        }}
                        className={`w-full text-left font-markazi text-lg flex items-center gap-2 group/item transition-all p-2 rounded-lg ${
                          isSelectionMode
                            ? componentSelectionStyle(isSelectedInMode)
                            : 'text-[#5D4037] dark:text-slate-300 hover:text-[#4A3728] dark:hover:text-amber-400 hover:bg-[#5D4037]/5 dark:hover:bg-white/5'
                        }`}
                      >
                        {isSelectionMode ? (
                          <div
                            className={`transition-transform duration-300 ${
                              isSelectedInMode ? 'scale-110' : 'scale-100 opacity-50'
                            }`}
                          >
                            {isSelectedInMode ? (
                              <CheckSquare
                                size={24}
                                className="text-[#4A3728] dark:text-amber-500 fill-[#F0EAD6] dark:fill-slate-900"
                              />
                            ) : (
                              <Square size={24} className="text-[#8D6E63] dark:text-slate-500" />
                            )}
                          </div>
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5D4037]/40 dark:bg-amber-500/40 group-hover/item:bg-[#4A3728] dark:group-hover/item:bg-amber-500 transition-colors"></span>
                        )}

                        <span className="flex-1 font-bold">{t.name}</span>

                        {!isSelectionMode && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-messiri font-bold text-[#8D6E63] dark:text-gray-500 border border-[#5D4037]/10 dark:border-amber-500/10 px-2 py-0.5 rounded-md bg-[#5D4037]/5 dark:bg-amber-500/5 group-hover/item:border-[#4A3728]/30 dark:group-hover/item:border-amber-500/30 transition-colors">
                              {t.time}
                            </span>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleTopicCompletion(t.name);
                              }}
                              title={
                                completedTopics.includes(t.name)
                                  ? 'Mark as incomplete'
                                  : 'Mark as complete'
                              }
                              className="mr-3 p-1 rounded-full transition-colors hover:bg-[#5D4037]/5 dark:hover:bg-white/5 text-[#8D6E63]/40 dark:text-slate-600"
                            >
                              {completedTopics.includes(t.name) ? (
                                <CheckCircle size={20} className="text-green-600 dark:text-green-500" />
                              ) : (
                                <Circle
                                  size={20}
                                  strokeWidth={1.5}
                                  className="hover:stroke-[#4A3728] dark:hover:stroke-amber-500 transition-colors"
                                />
                              )}
                            </button>

                            <div
                              role="button"
                              title={`Watch video about ${t.name}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                const videoID = t.videoUrl
                                  ? t.videoUrl.match(/v=([^&]+)/)?.[1] || null
                                  : null;

                                if (videoID) {
                                  onSelectVideo(videoID);
                                } else {
                                  const url =
                                    t.videoUrl ||
                                    `https://www.youtube.com/results?search_query=${encodeURIComponent(
                                      'Sir Nasim Zulfiqar ' + t.name
                                    )}`;
                                  window.open(url, '_blank');
                                }
                              }}
                              className="p-1 rounded-full text-[#8D6E63] dark:text-gray-400 hover:text-[#D97706] dark:hover:text-amber-500 hover:bg-[#5D4037]/10 dark:hover:bg-amber-500/10 transition-all transform hover:scale-110"
                            >
                              <PlayCircle size={18} />
                            </div>
                          </div>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
