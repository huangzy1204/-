
import React, { useState } from 'react';
import { AIChat } from './components/AIChat';
import { CURRICULUM } from './constants';
import { RoutineTask } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<RoutineTask[]>([
    { id: '1', task: '带狗狗去定点位排泄', time: '起床后', completed: false },
    { id: '2', task: '喂食 + 观察排泄情况', time: '早晨', completed: false },
    { id: '3', task: '5分钟嗅闻互动游戏', time: '午后', completed: false },
    { id: '4', task: '检查所有门窗围栏', time: '出门前', completed: false },
    { id: '5', task: '睡前温和抚摸（建立情感）', time: '睡前', completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">G</div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">GoldenGuide</h1>
          </div>
          <div className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
            2个月幼犬专注模式
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Intro Message */}
        <section className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-2xl font-bold mb-2">亲爱的朋友，你辛苦了 💛</h2>
            <p className="text-amber-50 opacity-90 leading-relaxed mb-4">
              我们知道抑郁时照顾一只调皮的金毛有多难。请记住：幼犬的顽皮是天性，而你的努力已经足够棒。打它只会让它怕你，让我们试试用更温柔有效的方法。
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 right-10 w-48 h-48 bg-black/5 rounded-full -mb-20 blur-3xl"></div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Routine & Checklist */}
          <div className="space-y-8">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                今日“小确幸”清单
              </h3>
              <p className="text-xs text-slate-500 mb-4">目标：每天完成3项就算胜利！</p>
              <div className="space-y-3">
                {tasks.map(task => (
                  <button
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`w-full flex items-center p-3 rounded-xl border transition-all ${
                      task.completed 
                        ? 'bg-green-50 border-green-200 text-green-700' 
                        : 'bg-slate-50 border-slate-100 hover:border-amber-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      task.completed ? 'bg-green-500 border-green-500' : 'border-slate-300'
                    }`}>
                      {task.completed && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>}
                    </div>
                    <div className="text-left">
                      <div className={`text-sm font-medium ${task.completed ? 'line-through opacity-60' : ''}`}>{task.task}</div>
                      <div className="text-[10px] opacity-60 uppercase tracking-wider font-bold">{task.time}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Curriculum/Lessons */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                核心训练手册
              </h3>
              {CURRICULUM.map(lesson => (
                <div key={lesson.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-amber-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-slate-800">{lesson.title}</h4>
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-bold uppercase">{lesson.category}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{lesson.description}</p>
                  <ul className="space-y-2 mb-4">
                    {lesson.steps.map((step, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="text-amber-500 font-bold">{i + 1}.</span>
                        <span className="text-slate-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800 leading-relaxed italic">
                    💡 给主人的悄悄话：{lesson.ownerTip}
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Right Column: AI Support */}
          <div className="space-y-6">
            <div className="sticky top-24">
              <AIChat />
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                <h4 className="text-sm font-bold text-red-800 mb-1 flex items-center gap-2">
                  ⚠️ 紧急提醒
                </h4>
                <p className="text-xs text-red-700 leading-relaxed">
                  如果你感到愤怒即将爆发，请立刻：
                  <br/>1. 把狗狗关进笼子或另一个房间（保证它安全）。
                  <br/>2. 自己去另一个房间深呼吸5分钟。
                  <br/>3. 暂时离开现场，不要在这个时刻尝试训练。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Persistent CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-20 flex justify-center">
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="bg-amber-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-amber-700 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
          返回顶部训练
        </button>
      </div>
    </div>
  );
};

export default App;
