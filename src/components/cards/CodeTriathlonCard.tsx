import React from 'react';

const DATACENTER_TEXTURE = "https://images.unsplash.com/photo-1558494949-ef526b0042a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export const CodeTriathlonCard: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#1e1e1e] flex flex-col relative overflow-hidden border-4 border-blue-500">
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{ backgroundImage: `url(${DATACENTER_TEXTURE})`, backgroundSize: 'cover' }}
      />
      <div className="flex flex-col h-full p-6 relative z-10">
        {/* Training Plan Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2 border-b border-gray-600 pb-2">
            <div className="text-blue-400 text-xs font-bold">vim training_plan.py</div>
            <div className="text-gray-500 text-xs">-- INSERT --</div>
          </div>
          <div className="font-mono text-sm space-y-2 text-gray-300">
            <p><span className="text-purple-400">import</span> <span className="text-yellow-300">caffeine</span></p>
            <br/>
            <p><span className="text-purple-400">class</span> <span className="text-blue-300">Triathlete</span>(<span className="text-green-300">Nerd</span>):</p>
            <p className="pl-4"><span className="text-purple-400">def</span> <span className="text-blue-300">optimize_life</span>(self):</p>
            <p className="pl-8"><span className="text-purple-400">while</span> <span className="text-cyan-300">self</span>.hr {'<'} <span className="text-orange-400">180</span>:</p>
            <p className="pl-12"><span className="text-yellow-300">self</span>.run_faster()</p>
            <p className="pl-12"><span className="text-gray-500"># TODO: Fix knee pain</span></p>
            <p className="pl-12"><span className="text-yellow-300">caffeine</span>.inject()</p>
            <p className="pl-8"><span className="text-purple-400">return</span> <span className="text-green-300">"KOM"</span></p>
          </div>
        </div>

        {/* Jul Wisdom Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2 border-b border-gray-600 pb-2">
            <div className="text-blue-400 text-xs font-bold">vim jul.py</div>
            <div className="text-gray-500 text-xs">-- INSERT --</div>
          </div>
          <div className="font-mono text-sm space-y-2 text-gray-300">
            <p><span className="text-purple-400">def</span> <span className="text-blue-300">le_sang</span>(<span className="text-orange-400">input_j</span>):</p>
            <p className="pl-4"><span className="text-gray-500"># Le J c'est le S</span></p>
           
            <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-green-300">"S"</span></p>
          </div>
        </div>

        {/* SQL Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2 border-b border-gray-600 pb-2">
            <div className="text-cyan-400 text-xs font-bold">psql party_db</div>
            <div className="text-gray-500 text-xs">-- QUERY --</div>
          </div>
          <div className="font-mono text-sm space-y-2 text-gray-300">
            <p><span className="text-gray-500">-- Gather the crew</span></p>
            <p><span className="text-cyan-400">SELECT</span> <span className="text-orange-400">*</span></p>
            <p><span className="text-cyan-400">FROM</span> <span className="text-yellow-300">family</span></p>
            <p><span className="text-cyan-400">FULL JOIN</span> <span className="text-yellow-300">friends</span><span className="text-purple-400">;</span></p>
          </div>
        </div>
        <div className="absolute bottom-20 right-4 bg-yellow-200 text-black p-4 transform -rotate-3 shadow-lg font-handwriting max-w-[150px] border border-yellow-400">
          <p className="font-bold text-sm mb-2">To Do:</p>
          <ul className="text-xs list-disc pl-4">
            <li>Buy carbon shoes</li>
            <li>Debug server</li>
            <li>Shave legs??</li>
          </ul>
        </div>
        <div className="absolute top-1/2 left-0 right-0 text-center transform -rotate-12 pointer-events-none mix-blend-hard-light">
          <h2 className="text-7xl font-black text-blue-500 opacity-20">
            ZONE 2<br/>ONLY
          </h2>
        </div>
      </div>
    </div>
  );
};
