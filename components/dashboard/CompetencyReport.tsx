"use client";

const skills = [
    { name: "Communication Skills", level: "Level 2", color: "bg-orange-400", percentage: 50 },
    { name: "Problem Solving", level: "Level 3", color: "bg-emerald-500", percentage: 75 },
    { name: "Technical Knowledge", level: "Level 4", color: "bg-lime-500", percentage: 100 },
];

export function CompetencyReport() {
    return (
        <div className="space-y-5">
            {skills.map((skill) => (
                <div key={skill.name}>
                    <div className="flex justify-between mb-1.5 items-end">
                        <span className="text-xs font-semibold text-gray-700">{skill.name}</span>
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                            className={`${skill.color} h-1.5 rounded-full relative`}
                            style={{ width: `${skill.percentage}%` }}
                        >
                        </div>
                    </div>
                    <div className="flex justify-end pr-1 mt-1">
                        <span className="text-[10px] text-gray-400 font-semibold">{skill.percentage}%</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
