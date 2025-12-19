
import React, { useState, useMemo } from 'react';
import { AIChat } from './components/AIChat';
import { CURRICULUM } from './constants';
import { RoutineTask, EnergyLevel } from './types';

const App: React.FC = () => {
  const [energy, setEnergy] = useState<EnergyLevel>('medium');
  const [tasks, setTasks] = useState<RoutineTask[]>([
    { id: '1', task: '带狗狗去定点位排泄', time: '起床后', completed: false, energyRequired: 'low' },
    { id: '2', task: '观察它的排泄信号（闻地/转圈）', time: '随身陪伴时', completed: false, energyRequired: 'low' },
    { id: '3', task: '短促的“坐下”训练（2分钟）', time: '精力尚可时', completed: false, energyRequired: 'medium' },
    { id: '4', task: '检查房门/围栏是否关严', time: '全天常态', completed: false, energyRequired: 'low' },
    { id: '5', task: '清理狗狗意外排泄（不带情绪）', time: '随时', completed: false, energyRequired: 'medium' },
    { id: '6', task: '温和的梳毛互动', time: '放松时刻', completed: false, energyRequired: 'medium' },
    { id: '7', task: '户外短距离随行（系紧绳索）', time: '精力充沛时', completed: false, energyRequired: 'high' },
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = useMemo(() => {
    if (energy === 'low') return tasks.filter(t => t.energyRequired === 'low');
    if (energy === 'medium') return tasks.filter(t => t.energyRequired !== 'high');
    return tasks;
  }, [tasks, energy]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center text-white font-black">GG</div>
            <h1 className="text-lg font-bold text-slate-800">GoldenGuide</h1>
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-full">
            {(['low', 'medium', 'high'] as EnergyLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setEnergy(level)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                  energy === level 
                    ? 'bg-amber-500 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {level === 'low' ? '今日无力' : level === 'medium' ? '状态一般' : '今日不错'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Personalized Message based on Energy */}
        <section className={`rounded-3xl p-6 transition-all duration-500 ${
          energy === 'low' ? 'bg-indigo-600 text-indigo-50' : 'bg-amber-500 text-white'
        } shadow-lg overflow-hidden relative`}>
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">
              {energy === 'low' ? '没关系，今天就先维持现状吧' : '今天和毛孩子一起加油！'}
            </h2>
            <p className="text-sm opacity-90 leading-relaxed">
              {energy === 'low' 
                ? '抑郁期时，只要能保证它不跑丢、不饿着就已经满分了。定点训练可以明天再继续，先把门关好，休息一下。' 
                : '既然你时刻带着它，那就把“观察”变成一种默契。多留意它的小动作，你会发现它真的很爱你。'}
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Conditional Task List */}
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h3 className="text-md font-bold mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  今日极简清单
                </span>
                <span className="text-[10px] text-slate-400">适配当前体力</span>
              </h3>
              <div className="space-y-3">
                {filteredTasks.length > 0 ? filteredTasks.map(task => (
                  <button
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`w-full flex items-center p-3 rounded-xl border transition-all ${
                      task.completed 
                        ? 'bg-green-50 border-green-200 text-green-700 opacity-60' 
                        : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md border flex-shrink-0 mr-3 flex items-center justify-center ${
                      task.completed ? 'bg-green-500 border-green-500' : 'border-slate-300'
                    }`}>
                      {task.completed && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>}
                    </div>
                    <span className={`text-xs font-medium ${task.completed ? 'line-through' : ''}`}>{task.task}</span>
                  </button>
                )) : (
                  <div className="text-center py-4 text-slate-400 text-xs italic">
                    今日暂无更高级任务，休息也是一种训练。
                  </div>
                )}
              </div>
            </section>

            {/* Curriculum for Always-Together dogs */}
            <section className="space-y-4">
              <h3 className="text-md font-bold px-1">核心训练要点</h3>
              {CURRICULUM.map(lesson => (
                <div key={lesson.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <h4 className="font-bold text-sm text-slate-800">{lesson.title}</h4>
                  </div>
                  <p className="text-[12px] text-slate-500 mb-3 leading-relaxed">{lesson.description}</p>
                  <ul className="space-y-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {lesson.steps.map((step, i) => (
                      <li key={i} className="text-[11px] text-slate-700 flex gap-2">
                        <span className="opacity-40">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="text-base">💡</span>
                    <p className="text-[11px] text-amber-800 leading-tight">
                      <strong>给你的悄悄话：</strong>{lesson.ownerTip}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </div>

          <div className="space-y-6">
            <div className="sticky top-20">
              <AIChat />
              <div className="mt-4 p-4 bg-white border border-red-100 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <h4 className="text-xs font-bold text-red-700">不要打它，请尝试“时间暂停”</h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed italic">
                  如果你觉得自己快要失控了，立刻把它放进围栏或单独的房间，给自己5分钟。这不仅是保护它，也是在给你一个冷静的拥抱。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
