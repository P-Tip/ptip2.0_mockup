// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";


const App: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('전체');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('마감임박순');
    const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
    const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
    const [selectedFilters, setSelectedFilters] = useState<{
        categories: string[];
        participationTypes: string[];
        benefits: string[];
    }>({
        categories: [],
        participationTypes: [],
        benefits: [],
    });
    const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({
        '1': true,
        '2': false,
        '3': true,
        '4': false,
        '5': true,
        '6': false,
    });
    const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobile = windowWidth < 768;
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
        setFavorites(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    const toggleExpand = (id: string) => {
        setExpandedProgram(expandedProgram === id ? null : id);
    };
    const toggleFilter = (type: 'categories' | 'participationTypes' | 'benefits', value: string) => {
        setSelectedFilters(prev => {
            const currentFilters = [...prev[type]];
            const index = currentFilters.indexOf(value);
            if (index === -1) {
                currentFilters.push(value);
            } else {
                currentFilters.splice(index, 1);
            }
            return {
                ...prev,
                [type]: currentFilters
            };
        });
    };
    const clearFilters = () => {
        setSelectedFilters({
            categories: [],
            participationTypes: [],
            benefits: [],
        });
    };
    const safeFormat = (date?: string): string => {
        if (!date) return "";
        const parts = date.split("-");
        if (parts.length !== 3) return date;
        const [, m, d] = parts.map(Number);
        return `${m}월 ${d}일`;
    };
    const calculateDaysLeft = (endDate: string): number => {
        const today = new Date();
        const end = new Date(endDate);
        const diffTime = end.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };
    const categories = ['전체', '학술', '취업', '문화', '봉사', '국제교류', '창업'];
    const programs = [
        {
            id: '1',
            title: '학부생 연구 프로젝트',
            category: '학술',
            description: '교수님과 함께하는 학부생 연구 프로젝트 참가자 모집',
            startDate: '2025-06-15',
            endDate: '2025-08-31',
            applicationDeadline: '2025-06-10',
            location: '중앙도서관 세미나실',
            benefits: ['연구 장학금 지급', '학점 인정 가능', '우수 연구 시상'],
            participationType: '오프라인',
            howToApply: '학과 사무실 방문 접수 또는 온라인 신청',
            details: '이 프로그램은 학부생들에게 실제 연구 경험을 제공하는 것을 목표로 합니다. 참가자들은 교수님의 지도 하에 연구 주제를 선정하고, 연구 계획 수립부터 결과 발표까지 전 과정에 참여하게 됩니다. 연구 결과는 학내 학술지에 게재될 수 있으며, 우수 연구는 학회 발표 기회가 제공됩니다.'
        },
        {
            id: '2',
            title: '취업 역량 강화 워크샵',
            category: '취업',
            description: '취업 준비를 위한 실전 면접 및 이력서 작성 워크샵',
            startDate: '2025-06-25',
            endDate: '2025-06-27',
            applicationDeadline: '2025-06-15',
            location: '학생회관 대강당',
            benefits: ['기업 인사담당자 피드백', '이력서 포트폴리오 제작', '우수자 인턴십 기회'],
            participationType: '오프라인',
            howToApply: '취업지원센터 홈페이지 신청',
            details: '이 워크샵은 졸업을 앞둔 학생들의 취업 준비를 돕기 위해 마련되었습니다. 3일간의 집중 프로그램으로, 이력서 작성법, 모의 면접, 자기소개서 첨삭 등을 제공합니다. 현직 기업 인사담당자들이 직접 피드백을 제공하며, 우수 참가자에게는 협력 기업 인턴십 기회가 주어집니다.'
        },
        {
            id: '3',
            title: '글로벌 리더십 캠프',
            category: '국제교류',
            description: '국제적 시각과 리더십 역량을 기르는 글로벌 캠프',
            startDate: '2025-07-10',
            endDate: '2025-07-17',
            applicationDeadline: '2025-06-20',
            location: '국제교류관 및 해외 현지',
            benefits: ['해외 대학생과 교류', '리더십 인증서 발급', '글로벌 네트워크 형성'],
            participationType: '온/오프라인 혼합',
            howToApply: '국제교류처 방문 접수',
            details: '글로벌 리더십 캠프는 국제적 시각과 리더십을 함양하기 위한 프로그램입니다. 1주일 동안 해외 대학생들과 함께 다양한 워크샵, 토론, 문화 교류 활동에 참여하게 됩니다. 캠프 전반부는 교내에서, 후반부는 해외 현지에서 진행되며, 모든 활동은 영어로 이루어집니다.'
        },
        {
            id: '4',
            title: '캠퍼스 축제 자원봉사자',
            category: '문화',
            description: '봄 축제 진행을 위한 자원봉사자를 모집합니다',
            startDate: '2025-06-15',
            endDate: '2025-06-18',
            applicationDeadline: '2025-06-05',
            location: '대학 캠퍼스 전역',
            benefits: ['봉사활동 인증', '활동비 지급', '축제 특별 혜택'],
            participationType: '오프라인',
            howToApply: '학생회 홈페이지 신청',
            details: '캠퍼스 축제 자원봉사자는 대학 최대 행사인 봄 축제의 성공적인 운영을 위한 핵심 인력입니다. 행사 준비, 부스 운영, 공연 지원, 안내 등 다양한 역할을 수행하게 됩니다. 모든 봉사자에게는 봉사 시간 인증과 소정의 활동비가 제공되며, 축제 기간 동안 특별 혜택을 받을 수 있습니다.'
        },
        {
            id: '5',
            title: '사회봉사 프로그램',
            category: '봉사',
            description: '지역사회 아동센터 교육봉사 프로그램',
            startDate: '2025-07-01',
            endDate: '2025-08-31',
            applicationDeadline: '2025-06-25',
            location: '지역 아동센터 5곳',
            benefits: ['봉사활동 인증', '장학금 지원', '교육봉사 인증서'],
            participationType: '오프라인',
            howToApply: '사회봉사센터 방문 신청',
            details: '이 프로그램은 지역사회 아동센터와 연계하여 교육 소외계층 아동들에게 학습 지원을 제공하는 봉사활동입니다. 참가자들은 주 2회, 각 2시간씩 지정된 아동센터에서 학습 멘토링을 진행하게 됩니다. 성실히 활동한 봉사자에게는 장학금이 지원되며, 교육봉사 인증서가 발급됩니다.'
        },
        {
            id: '6',
            title: '창업 아이디어 경진대회',
            category: '창업',
            description: '혁신적인 창업 아이디어를 발굴하는 경진대회',
            startDate: '2025-07-15',
            endDate: '2025-07-15',
            applicationDeadline: '2025-07-01',
            location: '창업지원관 컨퍼런스홀',
            benefits: ['상금 지급', '창업 멘토링', '투자자 연계 기회'],
            participationType: '오프라인',
            howToApply: '창업지원단 홈페이지 신청',
            details: '창업 아이디어 경진대회는 학생들의 혁신적인 아이디어를 발굴하고 실제 창업으로 연결하기 위한 프로그램입니다. 참가자들은 사업 아이템 발표를 통해 아이디어의 독창성, 실현 가능성, 시장성 등을 평가받게 됩니다. 우수 팀에게는 상금과 함께 전문 멘토링이 제공되며, 투자자와의 연계 기회도 마련됩니다.'
        }
    ];
    const filteredPrograms = programs.filter(program => {
// 카테고리 필터링
        if (activeCategory !== '전체' && program.category !== activeCategory) {
            return false;
        }
// 검색어 필터링
        if (searchTerm && !program.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !program.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
// 선택된 필터 적용
        if (selectedFilters.categories.length > 0 && !selectedFilters.categories.includes(program.category)) {
            return false;
        }
        if (selectedFilters.participationTypes.length > 0 && !selectedFilters.participationTypes.includes(program.participationType)) {
            return false;
        }
// 혜택 필터는 프로그램의 혜택 배열 중 하나라도 포함되어 있으면 통과
        if (selectedFilters.benefits.length > 0 && !program.benefits.some(benefit =>
            selectedFilters.benefits.some(selectedBenefit => benefit.includes(selectedBenefit))
        )) {
            return false;
        }
        return true;
    });
// 정렬 적용
    const sortedPrograms = [...filteredPrograms].sort((a, b) => {
        if (sortOption === '마감임박순') {
            return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
        } else if (sortOption === '최신순') {
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        } else { // 인기순 (즐겨찾기 기준)
            return (favorites[b.id] ? 1 : 0) - (favorites[a.id] ? 1 : 0);
        }
    });
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 relative">
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
                        <div></div>
                    )}
                </div>
            </header>
            {/* 메인 컨텐츠 */}
            <main className="flex-1 px-4 sm:px-6 py-8 max-w-[1280px] mx-auto w-full pb-20 md:pb-8">
                {/* 페이지 헤더 */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">교내외 프로그램</h1>
                    <p className="text-gray-600">다양한 교내외 프로그램을 탐색하고 참여하세요. 학업, 취업, 문화 활동 등 다양한 경험을 쌓을 수 있습니다.</p>
                </div>
                {/* 검색 및 필터 섹션 */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        {/* 검색바 */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="프로그램 검색"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                        {/* 필터 버튼 */}
                        <div className="relative">
                            <button
                                className="w-full md:w-auto px-6 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                onClick={() => setShowFilterOptions(!showFilterOptions)}
                            >
                                <i className="fas fa-filter"></i>
                                필터
                                {Object.values(selectedFilters).flat().length > 0 && (
                                    <span
                                        className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
{Object.values(selectedFilters).flat().length}
</span>
                                )}
                            </button>
                            {/* 필터 옵션 드롭다운 */}
                            {showFilterOptions && (
                                <div
                                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg z-20 p-4 border border-gray-100 animate-fadeIn">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-bold text-gray-800">필터</h3>
                                        <button
                                            className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                            onClick={clearFilters}
                                        >
                                            초기화
                                        </button>
                                    </div>
                                    {/* 카테고리 필터 */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">카테고리</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['학술', '취업', '문화', '봉사', '국제교류', '창업'].map(category => (
                                                <button
                                                    key={category}
                                                    className={`px-3 py-1 text-sm rounded-full ${
                                                        selectedFilters.categories.includes(category)
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                    } !rounded-button whitespace-nowrap cursor-pointer`}
                                                    onClick={() => toggleFilter('categories', category)}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* 참여 방식 필터 */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">참여 방식</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['오프라인', '온라인', '온/오프라인 혼합'].map(type => (
                                                <button
                                                    key={type}
                                                    className={`px-3 py-1 text-sm rounded-full ${
                                                        selectedFilters.participationTypes.includes(type)
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                    } !rounded-button whitespace-nowrap cursor-pointer`}
                                                    onClick={() => toggleFilter('participationTypes', type)}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* 혜택 필터 */}
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">혜택</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['장학금', '인증서', '학점', '상금', '멘토링'].map(benefit => (
                                                <button
                                                    key={benefit}
                                                    className={`px-3 py-1 text-sm rounded-full ${
                                                        selectedFilters.benefits.includes(benefit)
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                    } !rounded-button whitespace-nowrap cursor-pointer`}
                                                    onClick={() => toggleFilter('benefits', benefit)}
                                                >
                                                    {benefit}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* 정렬 옵션 */}
                        <div className="relative">
                            <button
                                className="w-full md:w-auto px-6 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                onClick={() => setShowSortOptions(!showSortOptions)}
                            >
                                <i className="fas fa-sort"></i>
                                {sortOption}
                            </button>
                            {/* 정렬 옵션 드롭다운 */}
                            {showSortOptions && (
                                <div
                                    className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-20 overflow-hidden border border-gray-100 animate-fadeIn">
                                    {['마감임박순', '최신순', '인기순'].map(option => (
                                        <button
                                            key={option}
                                            className={`w-full px-4 py-3 text-left ${
                                                sortOption === option ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
                                            } cursor-pointer`}
                                            onClick={() => {
                                                setSortOption(option);
                                                setShowSortOptions(false);
                                            }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* 카테고리 탭 */}
                    <div className="flex overflow-x-auto pb-2 -mx-2 px-2 hide-scrollbar">
                        <div className="flex space-x-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium ${
                                        activeCategory === category
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    } transition-colors !rounded-button whitespace-nowrap cursor-pointer`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* 프로그램 목록 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedPrograms.map(program => {
                        const daysLeft = calculateDaysLeft(program.applicationDeadline);
                        return (
                            <div
                                key={program.id}
                                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
                            >
                                <div className="p-6">
                                    {/* 프로그램 헤더 */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
<span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
    program.category === '학술' ? 'bg-blue-100 text-blue-800' :
        program.category === '취업' ? 'bg-purple-100 text-purple-800' :
            program.category === '문화' ? 'bg-orange-100 text-orange-800' :
                program.category === '봉사' ? 'bg-green-100 text-green-800' :
                    program.category === '국제교류' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-red-100 text-red-800'
}`}>
{program.category}
</span>
                                            {daysLeft <= 7 && (
                                                <span
                                                    className="inline-block bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">
{daysLeft <= 0 ? '마감' : `마감 ${daysLeft}일 전`}
</span>
                                            )}
                                        </div>
                                        <button
                                            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                            onClick={() => toggleFavorite(program.id)}
                                        >
                                            <i className={`${favorites[program.id] ? 'fas text-red-500' : 'far'} fa-heart text-xl`}></i>
                                        </button>
                                    </div>

                                    {/* 프로그램 제목 및 설명 */}
                                    <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                                    <p className="text-gray-600 mb-6 line-clamp-2">{program.description}</p>

                                    {/* 프로그램 상세 정보 */}
                                    <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">신청 기간</p>
                                                <p className="text-sm font-medium">~ {safeFormat(program.applicationDeadline ?? '')}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">진행 기간</p>
                                                <p className="text-sm font-medium">{safeFormat(program.startDate ?? '')} ~ {safeFormat(program.endDate ?? '')}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">참여 방식</p>
                                                <p className="text-sm font-medium">{program.participationType}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">장소</p>
                                                <p className="text-sm font-medium">{program.location}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 혜택 태그 */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {program.benefits.map((benefit, index) => (
                                            <span key={index}
                                                  className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">
{benefit}
</span>
                                        ))}
                                    </div>

                                    {/* 버튼 영역 */}
                                    <div className="flex space-x-3">
                                        <button
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-base font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                                            onClick={() => setExpandedProgram(program.id)}
                                        >
                                            상세 정보
                                            <i className="fas fa-external-link-alt ml-2"></i>
                                        </button>
                                        <button
                                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white py-2.5 rounded-lg text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                                            신청하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* 상세 정보 모달 */}
                {expandedProgram && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
<span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
    programs.find(p => p.id === expandedProgram)?.category === '학술' ? 'bg-blue-100 text-blue-800' :
        programs.find(p => p.id === expandedProgram)?.category === '취업' ? 'bg-purple-100 text-purple-800' :
            programs.find(p => p.id === expandedProgram)?.category === '문화' ? 'bg-orange-100 text-orange-800' :
                programs.find(p => p.id === expandedProgram)?.category === '봉사' ? 'bg-green-100 text-green-800' :
                    programs.find(p => p.id === expandedProgram)?.category === '국제교류' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-red-100 text-red-800'
}`}>
{programs.find(p => p.id === expandedProgram)?.category}
</span>
                                        <h3 className="text-2xl font-bold">{programs.find(p => p.id === expandedProgram)?.title}</h3>
                                    </div>
                                    <button
                                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                        onClick={() => setExpandedProgram(null)}
                                    >
                                        <i className="fas fa-times text-xl"></i>
                                    </button>
                                </div>

                                {/* 기본 정보 */}
                                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-2">신청 기간</p>
                                            <p className="font-medium">~ {safeFormat(programs.find(p => p.id === expandedProgram ?? '')?.applicationDeadline)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-2">진행 기간</p>
                                            <p className="font-medium">
                                                {safeFormat(programs.find(p => p.id === expandedProgram ?? '')?.startDate)} ~ {safeFormat(programs.find(p => p.id === expandedProgram ?? '')?.endDate)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-2">참여 방식</p>
                                            <p className="font-medium">{programs.find(p => p.id === expandedProgram)?.participationType}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-2">장소</p>
                                            <p className="font-medium">{programs.find(p => p.id === expandedProgram)?.location}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 상세 정보 */}
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-lg font-bold mb-3">프로그램 소개</h4>
                                        <p className="text-gray-600 leading-relaxed">{programs.find(p => p.id === expandedProgram)?.details}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold mb-3">제공 혜택</h4>
                                        <div className="bg-green-50 rounded-2xl p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {programs.find(p => p.id === expandedProgram)?.benefits.map((benefit, index) => (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                            <i className="fas fa-check text-green-600"></i>
                                                        </div>
                                                        <span className="text-gray-700">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold mb-3">신청 방법</h4>
                                        <div className="bg-gray-50 rounded-2xl p-6">
                                            <p className="text-gray-700">{programs.find(p => p.id === expandedProgram)?.howToApply}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-6">
                                        <button
                                            className="bg-gradient-to-r from-green-500 to-emerald-400 text-white py-3 px-8 rounded-lg text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                                            지금 신청하기
                                            <i className="fas fa-arrow-right ml-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* 프로그램이 없을 경우 */}
                {sortedPrograms.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
                        <div
                            className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-search text-gray-400 text-xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">프로그램을 찾을 수 없습니다</h3>
                        <p className="text-gray-600 mb-4">검색어나 필터를 변경하여 다시 시도해보세요.</p>
                        <button
                            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                            onClick={clearFilters}
                        >
                            필터 초기화
                        </button>
                    </div>
                )}
            </main>
            {/* 모바일 하단 네비게이션 */}
            {isMobile && (
                <div
                    className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center z-10">
                    <a
                        href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/56654ed9-c57f-404a-9175-fba93b9db6d3"
                        data-readdy="true"
                        className="flex flex-col items-center text-gray-500 cursor-pointer"
                    >
                        <i className="fas fa-home text-lg mb-1"></i>
                        <span className="text-xs">홈</span>
                    </a>
                    <a
                        href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/f7c1b969-a246-4d3c-b827-4ba0b0024e43"
                        data-readdy="true"
                        className="flex flex-col items-center text-gray-500 cursor-pointer"
                    >
                        <i className="fas fa-graduation-cap text-lg mb-1"></i>
                        <span className="text-xs">장학 프로그램</span>
                    </a>
                    <a
                        href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/56654ed9-c57f-404a-9175-fba93b9db6d3"
                        data-readdy="true"
                        className="flex flex-col items-center text-green-600 cursor-pointer"
                    >
                        <i className="fas fa-calendar-alt text-lg mb-1"></i>
                        <span className="text-xs">교내외 프로그램</span>
                    </a>
                    <a
                        href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/0d25b063-ddab-45fe-bc67-55a1a206f937"
                        data-readdy="true"
                        className="flex flex-col items-center text-gray-500 cursor-pointer"
                    >
                        <i className="fas fa-user text-lg mb-1"></i>
                        <span className="text-xs">마이페이지</span>
                    </a>
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
.hide-scrollbar::-webkit-scrollbar {
display: none;
}
.hide-scrollbar {
-ms-overflow-style: none;
scrollbar-width: none;
}
`}</style>
        </div>
    );
};
export default App