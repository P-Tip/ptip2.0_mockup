// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, {useState, useEffect} from 'react';
import { NavLink } from "react-router-dom";   // ← 추가

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'홈' | '장학금' | '프로그램' | 'MY'>('홈');
    const [favoriteItems, setFavoriteItems] = useState<{ [key: string]: boolean }>({
        '1': true,
        '3': false,
        '5': true,
    });
    const [showSummary, setShowSummary] = useState<{ [key: string]: boolean }>({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobile = windowWidth < 768;
    const [isScholarshipExpanded, setIsScholarshipExpanded] = useState(false);
    const [isNoticeExpanded, setIsNoticeExpanded] = useState(false);
    useEffect(() => {
        setIsScholarshipExpanded(!isMobile);
        setIsNoticeExpanded(!isMobile);
    }, [isMobile]);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const toggleFavorite = (id: string) => {
        setFavoriteItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    const toggleSummary = (id: string) => {
        setShowSummary(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    const formatDate = (date: Date): string => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dayOfWeek = days[date.getDay()];
        return `${month}월 ${day}일 (${dayOfWeek})`;
    };
    const currentDate = new Date();
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 relative">
            {/* 사이트 공지사항 배너 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100/50 backdrop-blur-sm">
                <div className="max-w-[1280px] mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-bullhorn text-green-600"></i>
                        <p className="text-sm text-gray-700">
                            <span className="font-medium text-green-700 mr-2">[공지]</span>
                            5월 업데이트: 새로운 장학금 알림 기능이 추가되었습니다
                        </p>
                    </div>

                    {/* 🔄 외부 a → 내부 NavLink  */}
                    <NavLink
                        to="/notice"
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </NavLink>
                </div>
            </div>
            {/* 상단 헤더 */}
            <header
                className="bg-white/80 text-gray-800 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-gray-100/50">
                <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 py-5">
                    <h1 className="text-2xl font-bold text-green-600">피팁</h1>
                    {!isMobile && (
                        <nav className="flex space-x-8">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `px-4 py-2 text-base font-medium transition-colors duration-200 cursor-pointer ${
                                        isActive
                                            ? "text-green-600 border-b-2 border-green-600"
                                            : "text-gray-600 hover:text-green-600"
                                    }`
                                }
                            >
                                홈
                            </NavLink>

                            <NavLink
                                to="/scholarships"
                                className={({ isActive }) =>
                                    `px-4 py-2 text-base font-medium transition-colors duration-200 cursor-pointer ${
                                        isActive
                                            ? "text-green-600 border-b-2 border-green-600"
                                            : "text-gray-600 hover:text-green-600"
                                    }`
                                }
                            >
                                장학 프로그램
                            </NavLink>

                            <NavLink
                                to="/programs"
                                className={({ isActive }) =>
                                    `px-4 py-2 text-base font-medium transition-colors duration-200 cursor-pointer ${
                                        isActive
                                            ? "text-green-600 border-b-2 border-green-600"
                                            : "text-gray-600 hover:text-green-600"
                                    }`
                                }
                            >
                                교내외 프로그램
                            </NavLink>

                            <NavLink
                                to="/mypage"
                                className={({ isActive }) =>
                                    `px-4 py-2 text-base font-medium transition-colors duration-200 cursor-pointer ${
                                        isActive
                                            ? "text-green-600 border-b-2 border-green-600"
                                            : "text-gray-600 hover:text-green-600"
                                    }`
                                }
                            >
                                마이페이지
                            </NavLink>
                        </nav>
                    )}
                    {isMobile && (
                        <div className="flex items-center">
                        </div>
                    )}
                </div>
            </header>
            {/* 메인 컨텐츠 */}
            <main className="flex-1 px-4 sm:px-6 py-8 max-w-[1280px] mx-auto w-full pb-20 md:pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 왼쪽 사이드바 - 장학금 현황 및 공지사항 */}
                    <div className="md:col-span-1 flex flex-col gap-4">
                        {/* 장학금 진행 상태 */}
                        <div
                            className="w-full bg-white rounded-3xl shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300">
                            <div className="p-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold">장학금 현황</h2>
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm text-gray-500">2025-1학기</p>
                                        {isMobile && (
                                            <button
                                                onClick={() => setIsScholarshipExpanded(!isScholarshipExpanded)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <i className={`fas fa-chevron-${isScholarshipExpanded ? 'up' : 'down'}`}></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {(!isMobile || isScholarshipExpanded) ? (
                                    <>
                                        <div
                                            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-4 mb-4 mt-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <i className="fas fa-award text-green-600"></i>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">장학금</p>
                                                    <p className="text-xl font-bold text-green-600">450,000 원</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="bg-red-50/50 rounded-2xl p-3">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <i className="fas fa-heart text-red-500"></i>
                                                    <p className="text-sm text-gray-700">좋아요</p>
                                                </div>
                                                <p className="text-lg font-bold text-gray-800">5 건</p>
                                            </div>
                                            <div className="bg-blue-50/50 rounded-2xl p-3">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <i className="fas fa-clock text-blue-600"></i>
                                                    <p className="text-sm text-gray-700">진행중</p>
                                                </div>
                                                <p className="text-lg font-bold text-gray-800">1 건</p>
                                            </div>
                                            <div className="bg-purple-50/50 rounded-2xl p-3">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <i className="fas fa-check-circle text-purple-600"></i>
                                                    <p className="text-sm text-gray-700">완료</p>
                                                </div>
                                                <p className="text-lg font-bold text-gray-800">4 건</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mt-4">
                                        <div
                                            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <i className="fas fa-award text-green-600"></i>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">장학금</p>
                                                    <p className="text-xl font-bold text-green-600">450,000 원</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* 학교 공지 */}
                        <div
                            className="w-full bg-white rounded-3xl shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">학교 공지</h2>
                                {isMobile && (
                                    <button
                                        onClick={() => setIsNoticeExpanded(!isNoticeExpanded)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <i className={`fas fa-chevron-${isNoticeExpanded ? 'up' : 'down'}`}></i>
                                    </button>
                                )}
                            </div>
                            {(!isMobile || isNoticeExpanded) ? (
                                <div className="flex flex-col gap-3">
                                    {/* 공지 아이템 1 */}
                                    <div
                                        className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-3">
                                                <h3 className="text-base font-bold">2025학년도 1학기 장학금 신청 안내</h3>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <i className="fas fa-calendar-alt text-xs mr-1"></i>
                                                        <span>2025.05.30</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                                            onClick={() => toggleSummary('notice1')}
                                                        >
                                                            <i className="fas fa-robot text-green-600 mr-1"></i> AI 요약
                                                        </button>
                                                        <a href="#"
                                                           className="bg-green-50 text-green-600 hover:bg-green-100 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer flex items-center">
                                                            상세보기
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {showSummary['notice1'] && (
                                            <div
                                                className="bg-gray-50/80 p-4 rounded-2xl mt-4 animate-fadeIn backdrop-blur-sm">
                                                <p className="text-sm text-gray-700">
                                                    2025학년도 1학기 교내 장학금 신청이 6월 10일부터 24일까지 진행됩니다. 학생지원처 홈페이지에서 신청 가능하며,
                                                    성적, 가계곤란, 봉사활동 등 다양한 장학금이 제공됩니다.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {/* 공지 아이템 2 */}
                                    <div
                                        className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-3">
                                                <h3 className="text-base font-bold">하계 인턴십 프로그램 참가자 모집</h3>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <i className="fas fa-calendar-alt text-xs mr-1"></i>
                                                        <span>2025.05.28</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                                            onClick={() => toggleSummary('notice2')}
                                                        >
                                                            <i className="fas fa-robot text-green-600 mr-1"></i> AI 요약
                                                        </button>
                                                        <a href="#"
                                                           className="bg-green-50 text-green-600 hover:bg-green-100 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer flex items-center">
                                                            상세보기
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {showSummary['notice2'] && (
                                            <div
                                                className="bg-gray-50/80 p-4 rounded-2xl mt-4 animate-fadeIn backdrop-blur-sm">
                                                <p className="text-sm text-gray-700">
                                                    2025년 하계 인턴십 프로그램 참가자 모집이 진행 중입니다. 6월 5일까지 취업지원센터 홈페이지에서 신청 가능하며,
                                                    다양한 기업과 연계된 유급 인턴십 기회가 제공됩니다.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {/* 공지 아이템 3 */}
                                    <div
                                        className="bg-gradient-to-br from-white to-gray-50/80 rounded-2xl p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-3">
                                                <h3 className="text-base font-bold">2025학년도 2학기 국가장학금 신청 안내</h3>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <i className="fas fa-calendar-alt text-xs mr-1"></i>
                                                        <span>2025.05.25</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                                            onClick={() => toggleSummary('notice3')}
                                                        >
                                                            <i className="fas fa-robot text-green-600 mr-1"></i> AI 요약
                                                        </button>
                                                        <a href="#"
                                                           className="bg-green-50 text-green-600 hover:bg-green-100 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer flex items-center">
                                                            상세보기
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {showSummary['notice3'] && (
                                            <div
                                                className="bg-gray-50/80 p-4 rounded-2xl mt-4 animate-fadeIn backdrop-blur-sm">
                                                <p className="text-sm text-gray-700">
                                                    2025학년도 2학기 국가장학금 신청이 5월 25일부터 6월 23일까지 진행됩니다. 한국장학재단 홈페이지에서 신청
                                                    가능하며, 소득분위에 따라 등록금 전액 또는 일부를 지원받을 수 있습니다.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-bell text-green-600"></i>
                                        <span>새로운 공지 3건</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="fas fa-clock text-blue-600"></i>
                                        <span>최근 업데이트: 2025.06.03</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* 메인 컨텐츠 영역 - 장학 프로그램 및 교내외 프로그램 */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        {/* 장학 프로그램 목록 */}
                        <div
                            className="w-full bg-white rounded-3xl shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">추천 장학 프로그램</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {/* 장학금 아이템 1 */}
                                <div
                                    className="bg-gradient-to-br from-white to-gray-50/80 rounded-3xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                                    <div
                                        className="absolute top-6 right-6 cursor-pointer transform transition-transform duration-300 hover:scale-110"
                                        onClick={() => toggleFavorite('1')}
                                    >
                                        <i className={`${favoriteItems['1'] ? 'fas text-red-500' : 'far text-gray-400'} fa-heart text-xl`}></i>
                                    </div>
                                    <div className="mb-2">
<span className="inline-block bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">
마감임박 (~6/10)
</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">학생성장 공부반 장학금</h3>
                                    <p className="text-base text-gray-700 mb-3">
                                        학업 성취도 향상을 위한 학생 성장 공부반 참여자를 위한 장학금 지원 프로그램
                                    </p>
                                    <div className="flex items-center text-base text-gray-700 mb-4">
                                        <i className="fas fa-building mr-2"></i>
                                        <span className="mr-4">2학기</span>
                                        <i className="fas fa-coins mr-2"></i>
                                        <span>50,000 ~ 100,000 원/월</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-base font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                            onClick={() => toggleSummary('scholarship1')}
                                        >
                                            <i className="fas fa-robot text-green-600 mr-1.5"></i> AI 요약
                                        </button>
                                        <button
                                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white py-2.5 rounded-lg text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer group">
                                            신청하기
                                            <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
                                        </button>
                                    </div>
                                    {showSummary['scholarship1'] && (
                                        <div
                                            className="bg-gray-50/80 p-4 rounded-2xl mt-4 animate-fadeIn backdrop-blur-sm">
                                            <p className="text-sm text-gray-700">
                                                학생성장 공부반 장학금은 학업 성취도 향상을 위한 프로그램으로, 매월 학습 보고서 제출 시 장학금이 지급됩니다. 성적 향상 시
                                                추가 인센티브가 있으며, 신청 마감이 임박했습니다.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {/* 장학금 아이템 2 */}
                                <div
                                    className="bg-gradient-to-br from-white to-gray-50/80 rounded-3xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 relative">
                                    <div
                                        className="absolute top-6 right-6 cursor-pointer"
                                        onClick={() => toggleFavorite('2')}
                                    >
                                        <i className={`${favoriteItems['2'] ? 'fas text-red-500' : 'far text-gray-400'} fa-heart text-xl`}></i>
                                    </div>
                                    <div className="mb-2">
<span className="inline-block bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">
마감임박 (~6/15)
</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">취업박람회 현장 방문 보고서 작성</h3>
                                    <p className="text-base text-gray-700 mb-3">
                                        취업박람회에 방문하고 방문 관련 보고서를 작성 후 제출
                                    </p>
                                    <div className="flex items-center text-base text-gray-700 mb-4">
                                        <i className="fas fa-building mr-2"></i>
                                        <span className="mr-4">1학기</span>
                                        <i className="fas fa-coins mr-2"></i>
                                        <span>50,000 원 (일시불)</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-base font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                            onClick={() => toggleSummary('scholarship2')}
                                        >
                                            <i className="fas fa-robot text-green-600 mr-1.5"></i> AI 요약
                                        </button>
                                        <button
                                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white py-2.5 rounded-lg text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer group">
                                            신청하기
                                            <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
                                        </button>
                                    </div>
                                    {showSummary['scholarship2'] && (
                                        <div
                                            className="bg-gray-50/80 p-4 rounded-2xl mt-4 animate-fadeIn backdrop-blur-sm">
                                            <p className="text-sm text-gray-700">
                                                글로벌 인재 양성 장학금은 해외 교환학생 및 어학연수 참가자에게 300만원을 지원합니다. 어학 성적과 학점이 선발 기준이며, 귀국
                                                후 보고서 제출이 필요합니다.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {/* 장학금 아이템 3 */}
                                <div
                                    className="bg-gradient-to-br from-white to-gray-50/80 rounded-3xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 relative">
                                    <div
                                        className="absolute top-6 right-6 cursor-pointer"
                                        onClick={() => toggleFavorite('3')}
                                    >
                                        <i className={`${favoriteItems['3'] ? 'fas text-red-500' : 'far text-gray-400'} fa-heart text-xl`}></i>
                                    </div>
                                    <div className="mb-2">
<span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
30일 전 (~7/5)
</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">창업 지원 장학금</h3>
                                    <p className="text-base text-gray-700 mb-3">
                                        창업 아이디어를 가진 학생들을 위한 지원 프로그램
                                    </p>
                                    <div className="flex items-center text-base text-gray-700 mb-4">
                                        <i className="fas fa-building mr-2"></i>
                                        <span className="mr-4">1학기</span>
                                        <i className="fas fa-coins mr-2"></i>
                                        <span>최대 200,000 원</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-base font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                            onClick={() => toggleSummary('scholarship3')}
                                        >
                                            <i className="fas fa-robot text-green-600 mr-1.5"></i> AI 요약
                                        </button>
                                        <button
                                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white py-2.5 rounded-lg text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer group">
                                            신청하기
                                            <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
                                        </button>
                                    </div>
                                    {showSummary['scholarship3'] && (
                                        <div
                                            className="bg-gray-50/80 p-4 rounded-2xl mt-4 animate-fadeIn backdrop-blur-sm">
                                            <p className="text-sm text-gray-700">
                                                창업 지원 장학금은 혁신적인 창업 아이디어를 가진 학생들에게 최대 300만원을 지원합니다. 사업계획서 제출 후 심사를 통해
                                                선발되며, 멘토링 프로그램도 함께 제공됩니다.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <a href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/f7c1b969-a246-4d3c-b827-4ba0b0024e43"
                                   data-readdy="true"
                                   className="px-6 py-3 bg-white text-green-600 rounded-full font-medium shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer no-underline inline-flex items-center">
                                    더 많은 장학 프로그램 보기
                                    <i className="fas fa-chevron-right ml-2 text-xs"></i>
                                </a>
                            </div>
                        </div>
                        {/* 교내외 프로그램 */}
                        <div
                            className="w-full bg-white rounded-3xl shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">진행중인 교내/외 활동</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {/* 프로그램 카드 1 */}
                                <div
                                    className="bg-gradient-to-br from-white to-gray-50/80 rounded-3xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 relative">
                                    <div
                                        className="absolute top-6 right-6 cursor-pointer"
                                        onClick={() => toggleFavorite('prog1')}
                                    >
                                        <i className={`${favoriteItems['prog1'] ? 'fas text-red-500' : 'far text-gray-400'} fa-heart text-xl`}></i>
                                    </div>
                                    <div className="mb-2">
<span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
학술
</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">학부생 연구 프로젝트</h3>
                                    <p className="text-base text-gray-700 mb-3">
                                        교수님과 함께하는 학부생 연구 프로젝트 참가자 모집
                                    </p>
                                    <div className="flex items-center text-base text-gray-700 mb-4">
                                        <i className="fas fa-calendar-alt mr-2"></i>
                                        <span>2025.06.15 ~ 2025.08.31</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-base font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                            onClick={() => toggleSummary('program1')}
                                        >
                                            <i className="fas fa-robot text-green-600 mr-1.5"></i> AI 요약
                                        </button>
                                        <button
                                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white py-2.5 rounded-lg text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer group">
                                            신청하기
                                            <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
                                        </button>
                                    </div>
                                    {showSummary['program1'] && (
                                        <div
                                            className="bg-gray-50/80 p-4 rounded-2xl mt-4 animate-fadeIn backdrop-blur-sm">
                                            <p className="text-sm text-gray-700">
                                                학부생 연구 프로젝트는 교수님의 지도 하에 실제 연구에 참여할 수 있는 기회입니다. 여름방학 동안 진행되며, 연구 결과는 학술지
                                                게재나 학회 발표로 이어질 수 있습니다.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {/* 프로그램 카드 2 */}
                                <div
                                    className="bg-gradient-to-br from-white to-gray-50/80 rounded-3xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 relative">
                                    <div
                                        className="absolute top-6 right-6 cursor-pointer"
                                        onClick={() => toggleFavorite('prog2')}
                                    >
                                        <i className={`${favoriteItems['prog2'] ? 'fas text-red-500' : 'far text-gray-400'} fa-heart text-xl`}></i>
                                    </div>
                                    <div className="mb-2">
<span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">
취업
</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">취업 역량 강화 워크샵</h3>
                                    <p className="text-base text-gray-700 mb-3">
                                        취업 준비를 위한 실전 면접 및 이력서 작성 워크샵
                                    </p>
                                    <div className="flex items-center text-base text-gray-700 mb-4">
                                        <i className="fas fa-calendar-alt mr-2"></i>
                                        <span>2025.06.25 ~ 2025.06.27</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-base font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                            onClick={() => toggleSummary('program2')}
                                        >
                                            <i className="fas fa-robot text-green-600 mr-1.5"></i> AI 요약
                                        </button>
                                        <button
                                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white py-2.5 rounded-lg text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer group">
                                            신청하기
                                            <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
                                        </button>
                                    </div>
                                    {showSummary['program2'] && (
                                        <div
                                            className="bg-gray-50/80 p-4 rounded-2xl mt-4 animate-fadeIn backdrop-blur-sm">
                                            <p className="text-sm text-gray-700">
                                                취업 역량 강화 워크샵은 3일간 진행되는 집중 프로그램으로, 이력서 작성법, 모의 면접, 자기소개서 첨삭 등을 제공합니다. 현직
                                                인사담당자들이 직접 피드백을 제공합니다.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {/* 프로그램 카드 3 */}
                                <div
                                    className="bg-gradient-to-br from-white to-gray-50/80 rounded-3xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 relative">
                                    <div
                                        className="absolute top-6 right-6 cursor-pointer"
                                        onClick={() => toggleFavorite('prog3')}
                                    >
                                        <i className={`${favoriteItems['prog3'] ? 'fas text-red-500' : 'far text-gray-400'} fa-heart text-xl`}></i>
                                    </div>
                                    <div className="mb-2">
<span className="inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full font-medium">
문화
</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">캠퍼스 축제 자원봉사자</h3>
                                    <p className="text-base text-gray-700 mb-3">
                                        봄 축제 진행을 위한 자원봉사자를 모집합니다
                                    </p>
                                    <div className="flex items-center text-base text-gray-700 mb-4">
                                        <i className="fas fa-calendar-alt mr-2"></i>
                                        <span>2025.06.15 ~ 2025.06.18</span>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-base font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                            onClick={() => toggleSummary('program3')}
                                        >
                                            <i className="fas fa-robot text-green-600 mr-1.5"></i> AI 요약
                                        </button>
                                        <button
                                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white py-2.5 rounded-lg text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer group">
                                            신청하기
                                            <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
                                        </button>
                                    </div>
                                    {showSummary['program3'] && (
                                        <div
                                            className="bg-gray-50/80 p-4 rounded-2xl mt-4 animate-fadeIn backdrop-blur-sm">
                                            <p className="text-sm text-gray-700">
                                                캠퍼스 축제 자원봉사자는 6월 중순 진행되는 대학 축제 운영을 돕는 활동입니다. 행사 준비, 부스 운영, 안내 등 다양한 역할이
                                                있으며, 봉사 시간 인증과 소정의 활동비가 제공됩니다.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <a href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/b392cf82-d87d-4142-9459-7fa41c94c62d"
                                   data-readdy="true"
                                   className="px-6 py-3 bg-white text-green-600 rounded-full font-medium shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer no-underline inline-flex items-center">
                                    더 많은 프로그램 보기
                                    <i className="fas fa-chevron-right ml-2 text-xs"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* 모바일 하단 네비게이션 */}
            {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center z-10">
                    {/* 홈 */}
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `flex flex-col items-center cursor-pointer ${
                                isActive ? "text-green-600" : "text-gray-500"
                            }`
                        }
                    >
                        <i className="fas fa-home text-lg mb-1"></i>
                        <span className="text-xs">홈</span>
                    </NavLink>

                    {/* 장학 프로그램 */}
                    <NavLink
                        to="/scholarships"
                        className={({ isActive }) =>
                            `flex flex-col items-center cursor-pointer ${
                                isActive ? "text-green-600" : "text-gray-500"
                            }`
                        }
                    >
                        <i className="fas fa-graduation-cap text-lg mb-1"></i>
                        <span className="text-xs">장학 프로그램</span>
                    </NavLink>

                    {/* 교내외 프로그램 */}
                    <NavLink
                        to="/programs"
                        className={({ isActive }) =>
                            `flex flex-col items-center cursor-pointer ${
                                isActive ? "text-green-600" : "text-gray-500"
                            }`
                        }
                    >
                        <i className="fas fa-calendar-alt text-lg mb-1"></i>
                        <span className="text-xs">교내외 프로그램</span>
                    </NavLink>

                    {/* 마이페이지 */}
                    <NavLink
                        to="/mypage"
                        className={({ isActive }) =>
                            `flex flex-col items-center cursor-pointer ${
                                isActive ? "text-green-600" : "text-gray-500"
                            }`
                        }
                    >
                        <i className="fas fa-user text-lg mb-1"></i>
                        <span className="text-xs">마이페이지</span>
                    </NavLink>
                </div>
            )}
            <style>{`
@keyframes fadeIn {
from { opacity: 0; transform: translateY(-10px); }
to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
animation: fadeIn 0.3s ease-out forwards;
}
`}</style>
        </div>
    );
};
export default App