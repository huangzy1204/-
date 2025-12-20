
import React, { useState, useMemo } from 'react';
import { AIChat } from './components/AIChat';
import { CURRICULUM } from './constants';
import { RoutineTask, EnergyLevel } from './types';

const App: React.FC = () => {
  const [energy, setEnergy] = useState<EnergyLevel>('medium');
  const [tasks, setTasks] = useState<RoutineTask[]>([
    { id: '1', task: '带狗狗去定点位排泄', time: '起床后', completed: false, energyRequired: 'low' },
    { id: '2', task: '观察它的排泄信号（闻地/转圈）', time: '陪伴时', completed: false, energyRequired: 'low' },
    { id: '3', task: '短促的“坐下”训练（2分钟）', time: '状态好时', completed: false, energyRequired: 'medium' },
    { id: '5', task: '清理意外排泄（不带情绪）', time: '随时', completed: false, energyRequired: 'medium' },
    { id: '6', task: '温和的梳毛/抚摸互动', time: '放松时刻', completed: false, energyRequired: 'medium' },
    { id: '7', task: '随身模式：练习“召回”响应', time: '互动时', completed: false, energyRequired: 'high' },
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Mobile-Optimized Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white font-black text-sm">G</div>
            <h1 className="text-base font-bold text-slate-800">GoldenGuide</h1>
          </div>
          <div className="flex gap-1 bg-slate-100 p-0.5 rounded-full">
            {(['low', 'medium', 'high'] as EnergyLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setEnergy(level)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all whitespace-nowrap ${
                  energy === level 
                    ? 'bg-amber-500 text-white shadow-sm' 
                    : 'text-slate-500'
                }`}
              >
                {level === 'low' ? '今日无力' : level === 'medium' ? '状态一般' : '今日不错'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-4 space-y-5">
        {/* Mood Card */}
        <section className={`rounded-2xl p-5 transition-all duration-500 ${
          energy === 'low' ? 'bg-indigo-600 text-indigo-50' : 'bg-amber-500 text-white'
        } shadow-md relative overflow-hidden`}>
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-1 leading-tight">
              {energy === 'low' ? '没关系，今天只要陪伴就好' : '建立你们的默契'}
            </h2>
            <p className="text-xs opacity-90 leading-normal">
              {energy === 'low' 
                ? '抑郁期时，只要能保证它不饿着就已经满分了。不要有压力，休息一下。' 
                : '既然全天带着它，多留意它回头看你的瞬间，给个微笑。'}
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
          </div>
        </section>

        {/* Minimalist Task List - Large Touch Area */}
        <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-slate-800">
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            今日极简清单
          </h3>
          <div className="space-y-2">
            {filteredTasks.map(task => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`w-full flex items-center p-4 rounded-xl border text-left transition-all active:scale-[0.98] ${
                  task.completed 
                    ? 'bg-green-50/50 border-green-100 text-green-700 opacity-60' 
                    : 'bg-slate-50 border-slate-100'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mr-4 flex items-center justify-center ${
                  task.completed ? 'bg-green-500 border-green-500' : 'border-slate-300'
                }`}>
                  {task.completed && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-semibold ${task.completed ? 'line-through' : ''}`}>{task.task}</div>
                  <div className="text-[10px] opacity-50 uppercase tracking-tighter mt-0.5">{task.time}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* AI Chat - Sticky Support */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold px-1 text-slate-800">遇到突发情况？</h3>
          <AIChat />
        </section>

        {/* Instruction Cards */}
        <section className="space-y-4 pt-2">
          <h3 className="text-sm font-bold px-1 text-slate-800">核心训练手册</h3>
          {CURRICULUM.map(lesson => (
            <div key={lesson.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <h4 className="font-bold text-sm text-slate-800">{lesson.title}</h4>
              </div>
              <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">{lesson.description}</p>
              <div className="space-y-2 bg-slate-50 p-3 rounded-xl mb-3 border border-slate-100">
                {lesson.steps.map((step, i) => (
                  <div key={i} className="text-[11px] text-slate-700 flex gap-2">
                    <span className="font-bold text-amber-600/50">{i + 1}</span>
                    <span className="leading-normal">{step}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                <span className="text-sm">💡</span>
                <p className="text-[10px] text-amber-900 leading-tight">
                  <strong>悄悄话：</strong>{lesson.ownerTip}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Emergency Alert */}
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
            <h4 className="text-[11px] font-bold text-red-700 uppercase">情绪预警</h4>
          </div>
          <p className="text-[10px] text-red-800/80 leading-relaxed italic">
            散养意味着更多摩擦。如果你想发火，请立刻停止互动并离开现场5分钟。不打它，是由于你对它深深的爱。
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
