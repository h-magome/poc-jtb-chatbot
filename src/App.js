import React, { useState } from 'react';
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { ScrollArea } from "./components/ui/scroll-area";
import { MessageSquare, ChevronDown } from "lucide-react";

const IdeaGenerationApp = () => {
  const [hasIdea, setHasIdea] = useState(null);
  // アイディアがある場合の入力フォーム
  const [segment, setSegment] = useState('');
  const [problem, setProblem] = useState('');
  const [value, setValue] = useState('');
  const [solution, setSolution] = useState('');
  
  // アイディアがない場合のタグ選択
  const [selectedTag, setSelectedTag] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [searchResults, setSearchResults] = useState([]);
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // モックデータ
  const mockTags = [
    { label: 'タグA', value: 'tag-a' },
    { label: 'タグB', value: 'tag-b' },
    { label: 'タグC', value: 'tag-c' },
    { label: 'タグD', value: 'tag-d' },
    { label: 'タグE', value: 'tag-e' },
    { label: 'タグF', value: 'tag-f' },
  ];

  const filteredTags = mockTags.filter(tag => 
    tag.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (hasIdea) {
      setSearchResults([
        { id: 1, title: 'ナレッジ1', content: '顧客ニーズを的確に捉えている事例です' },
        { id: 2, title: 'ナレッジ2', content: '具体的な解決策を提示している事例です' },
        { id: 3, title: 'ナレッジ3', content: '実用的な提案内容の事例です' },
        { id: 4, title: 'ナレッジ4', content: '市場価値の高い事例です' }
      ]);
    } else {
      setSearchResults([
        { id: 1, title: 'ナレッジ1', content: '参考事例1の詳細' },
        { id: 2, title: 'ナレッジ2', content: '参考事例2の詳細' },
        { id: 3, title: 'ナレッジ3', content: '参考事例3の詳細' },
        { id: 4, title: 'ナレッジ4', content: '参考事例4の詳細' }
      ]);
    }
  };

  const generateNewIdeas = (baseIdea) => {
    setGeneratedIdeas([
      { id: 1, content: '新しいアイディア1の詳細' },
      { id: 2, content: '新しいアイディア2の詳細' },
      { id: 3, content: '新しいアイディア3の詳細' }
    ]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* サイドバー */}
      <div className="w-64 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">アイディアの状態</h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="hasIdea"
              value="true"
              checked={hasIdea === true}
              onChange={() => {
                setHasIdea(true);
                setSearchResults([]);
                setGeneratedIdeas([]);
                setShowChat(false);
                setSelectedTag('');
              }}
              className="form-radio"
            />
            <span>アイディアがある</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="hasIdea"
              value="false"
              checked={hasIdea === false}
              onChange={() => {
                setHasIdea(false);
                setSearchResults([]);
                setGeneratedIdeas([]);
                setShowChat(false);
                setSegment('');
                setProblem('');
                setValue('');
                setSolution('');
              }}
              className="form-radio"
            />
            <span>アイディアがない</span>
          </label>
        </div>

        {hasIdea === false && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">タグ選択</h3>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedTag ? mockTags.find(t => t.value === selectedTag)?.label : 'タグを選択'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="タグを検索..."
                    className="w-full p-2 border-b"
                  />
                  <div className="max-h-48 overflow-y-auto">
                    {filteredTags.map((tag) => (
                      <div
                        key={tag.value}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedTag(tag.value);
                          setIsDropdownOpen(false);
                        }}
                      >
                        <div className="w-4 h-4 border rounded mr-2 flex items-center justify-center">
                          {selectedTag === tag.value && "✓"}
                        </div>
                        {tag.label}
                      </div>
                    ))}
                    {filteredTags.length === 0 && (
                      <div className="px-3 py-2 text-gray-500">
                        タグが見つかりません
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 p-6">
        {hasIdea === null ? (
          <div className="text-center text-gray-500 mt-10">
            左のサイドバーからオプションを選択してください
          </div>
        ) : (
          <div className="space-y-6">
            {/* アイディア入力エリア (アイディアがある場合) */}
            {hasIdea && (
              <Card>
                <CardHeader>
                  <CardTitle>あなたのアイディアを入力してください</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">セグメント</h3>
                    <Textarea
                      value={segment}
                      onChange={(e) => setSegment(e.target.value)}
                      className="min-h-[100px]"
                      placeholder="対象となるセグメントを入力してください"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">困っていること</h3>
                    <Textarea
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      className="min-h-[100px]"
                      placeholder="課題や問題点を入力してください"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">実感価値</h3>
                    <Textarea
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="min-h-[100px]"
                      placeholder="提供する価値を入力してください"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">商品・ソリューション</h3>
                    <Textarea
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      className="min-h-[100px]"
                      placeholder="具体的な解決策を入力してください"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 検索ボタン */}
            {((hasIdea && (segment || problem || value || solution)) || 
              (!hasIdea && selectedTag)) && (
              <Button 
                onClick={handleSearch}
                className="w-full"
              >
                検索
              </Button>
            )}

            {/* 検索結果表示 */}
            {searchResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>検索結果</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {searchResults.map(result => (
                      <div
                        key={result.id}
                        className="p-4 border rounded-lg mb-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          if (!hasIdea) {
                            generateNewIdeas(result);
                          }
                        }}
                      >
                        <h3 className="font-semibold">{result.title}</h3>
                        <p className="mt-2 text-gray-600">{result.content}</p>
                        {!hasIdea && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-2"
                          >
                            このアイディアを使用する
                          </Button>
                        )}
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            {/* チャット画面 */}
            {(showChat || (hasIdea && searchResults.length > 0)) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2" />
                    アイディアブラッシュアップチャット
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4 min-h-[200px]">
                    チャットメッセージ表示エリア
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="メッセージを入力..."
                      className="flex-1"
                    />
                    <Button>送信</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaGenerationApp;