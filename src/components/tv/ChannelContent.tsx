
import React from 'react';

interface ChannelContentProps {
  contentType: string;
  channelName: string;
}

const ChannelContent = ({ contentType, channelName }: ChannelContentProps) => {
  switch (contentType) {
    case "news":
      return (
        <div className="w-full h-full flex flex-col">
          <div className="bg-blue-900 text-white p-1 text-xs">ПРЯМОЙ ЭФИР</div>
          <div className="flex-1 bg-gradient-to-r from-blue-800 to-blue-900 flex items-center justify-center">
            <div className="bg-blue-950/50 p-4 rounded">
              <h3 className="text-white font-bold mb-2">Последние новости</h3>
              <p className="text-gray-200 text-sm">Обсуждение экономической ситуации</p>
            </div>
          </div>
          <div className="bg-blue-900 flex justify-between items-center p-1">
            <span className="text-white text-xs">{channelName}</span>
            <span className="text-white text-xs">LIVE</span>
          </div>
        </div>
      );
    
    case "kids":
      return (
        <div className="w-full h-full bg-gradient-to-br from-pink-400 to-yellow-300 flex items-center justify-center">
          <div className="w-24 h-24 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
            <div className="w-16 h-16 bg-pink-500 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-4 left-4 bg-white/80 rounded px-2 py-1">
            <p className="text-sm font-bold">{channelName}</p>
            <p className="text-xs">Мультфильмы для детей</p>
          </div>
        </div>
      );
    
    case "entertainment":
      return (
        <div className="w-full h-full bg-gradient-to-br from-purple-800 to-purple-500 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-white rounded-full mb-2"></div>
          <p className="text-white font-bold text-xl mb-1">Вечернее шоу</p>
          <p className="text-gray-200 text-sm">{channelName} представляет</p>
        </div>
      );
    
    case "sports":
      return (
        <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-500">
          <div className="w-full h-full flex flex-col">
            <div className="bg-black/70 text-white p-1 flex justify-between">
              <span className="text-xs">ФУТБОЛ: Лига Чемпионов</span>
              <span className="text-xs font-bold">2 - 1</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-32 h-24 border-2 border-white bg-green-700">
                <div className="absolute left-0 w-4 h-12 border border-white top-1/2 -translate-y-1/2"></div>
                <div className="absolute right-0 w-4 h-12 border border-white top-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      );
    
    case "culture":
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-800 to-amber-500 flex items-center justify-center">
          <div className="bg-black/40 p-3 rounded text-center">
            <h3 className="text-white font-serif text-lg mb-2">История искусств</h3>
            <p className="text-gray-200 text-sm font-serif">Документальный фильм</p>
          </div>
        </div>
      );
    
    case "crime":
      return (
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
          <div className="border-l-4 border-red-600 pl-2">
            <h3 className="text-white font-bold mb-1">Криминальная хроника</h3>
            <p className="text-gray-300 text-sm">Специальный репортаж</p>
          </div>
          <div className="absolute top-2 right-2 text-red-600 text-xs px-2 py-0.5 bg-black/50 rounded">
            18+
          </div>
        </div>
      );
    
    default:
      return (
        <div className="text-white text-center">
          <p className="text-2xl">{channelName}</p>
          <p className="text-gray-400 mt-4">Нажмите кнопки на пульте для управления ТВ</p>
        </div>
      );
  }
};

export default ChannelContent;
