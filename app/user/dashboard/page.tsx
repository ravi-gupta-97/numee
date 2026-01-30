import { Share, Download } from "lucide-react";
import { CompetencyReport } from "@/components/dashboard/CompetencyReport";
import { SkillGapAnalysis } from "@/components/dashboard/SkillGapAnalysis";
import { ComparisonChart } from "@/components/dashboard/ComparisonChart";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { JobItem } from "@/components/dashboard/JobItem";

const courses = [
    {
        title: "React front to back",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
        price: 60,
        originalPrice: 120,
        lessons: 20,
        duration: "1 Week",
        image: "/course-react.png",
    },
    {
        title: "PHP Beginner + Advanced",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
        price: 60,
        originalPrice: 120,
        lessons: 10,
        duration: "5 Days",
        image: "/course-php.png",
    },
    {
        title: "Angular Zero to Mastery",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
        price: 60,
        originalPrice: 120,
        lessons: 12,
        duration: "6 Days",
        image: "/course-angular.png",
    },
];

const jobs = [
    {
        company: "Intelizign",
        title: "Intelizign lifecycle Services",
        description: "INTELIZIGN is a PLM & CAD Solutions / Services organization with a strong...",
        rating: 3.4,
        reviews: 289,
        tags: ["Indian MNC", "IT Services & Consulting"],
    },
    {
        company: "Intelizign",
        title: "Intelizign lifecycle Services",
        description: "INTELIZIGN is a PLM & CAD Solutions / Services organization with a strong...",
        rating: 3.4,
        reviews: 289,
        tags: ["Indian MNC", "IT Services & Consulting"],
    },
    {
        company: "Intelizign",
        title: "Intelizign lifecycle Services",
        description: "INTELIZIGN is a PLM & CAD Solutions / Services organization with a strong...",
        rating: 3.4,
        reviews: 289,
        tags: ["Indian MNC", "IT Services & Consulting"],
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Dashboard Overview Header */}
            <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Real-time overview of user engagement and career readiness.</p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:from-orange-500 hover:to-orange-700 transition-all shadow-md hover:shadow-lg">
                    <Download className="h-4 w-4" />
                    Share Data
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Main Content) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Competency Report */}
                    <section className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
                        <h2 className="text-base font-bold text-gray-800 mb-1">Competency Report</h2>
                        <p className="text-xs text-gray-500 mb-6">Overview of your current skill proficiency levels.</p>
                        <CompetencyReport />
                    </section>

                    {/* Comparison Analysis */}
                    <section className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-base font-bold text-gray-800 mb-1">Comparison Analysis</h2>
                                <p className="text-xs text-gray-500">Resume vs. JD vs. Test Answers</p>
                            </div>
                        </div>
                        <ComparisonChart />
                    </section>

                    {/* Recommended Courses */}
                    <section>
                        <h2 className="text-base font-bold text-gray-800 mb-1">Recommended Courses</h2>
                        <p className="text-xs text-gray-500 mb-4">Lorem Ipsum is simply dummy text of the printing</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {courses.map((course, i) => (
                                <CourseCard key={i} {...course} />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column (Sidebar Widgets) */}
                <div className="space-y-6">
                    {/* Skill Gap Analysis */}
                    <section className="bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 h-fit">
                        <h2 className="text-base font-bold text-gray-800 mb-1">Skill Gap Analysis</h2>
                        <div className="text-xs text-gray-500 mb-6">Overall view — gap measured out of 100.</div>
                        <SkillGapAnalysis />
                    </section>

                    {/* Recommended Jobs */}
                    <section>
                        <h2 className="text-base font-bold text-gray-800 mb-1">Recommended Jobs</h2>
                        <div className="text-xs text-gray-500 mb-4">Showing 24 companies</div>
                        <div className="space-y-3">
                            {jobs.map((job, i) => (
                                <JobItem key={i} {...job} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
