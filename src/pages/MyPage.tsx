// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'홈' | '장학금' | '프로그램' | 'MY'>('MY');
    const [activeSection, setActiveSection] = useState<'프로필' | '계정관리' | '활동내역' | '알림설정'>('프로필');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobile = windowWidth < 768;
// 카카오 로그인 상태
    const [isKakaoConnected, setIsKakaoConnected] = useState(true);
// 학교 인증 상태
    const [isSchoolVerified, setIsSchoolVerified] = useState(false);
// 이메일 수신 설정
    const [emailSettings, setEmailSettings] = useState({
        notice: true,
        scholarship: true,
        program: false
    });
// 비밀번호 변경 모달
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
// 회원 탈퇴 모달
    const [showDeleteModal, setShowDeleteModal] = useState(false);
// 활동내역 필터
    const [activityFilter, setActivityFilter] = useState<'전체' | '장학금' | '교내외'>('전체');
    const [favoriteFilter, setFavoriteFilter] = useState<'전체' | '진행중' | '완료'>('전체');
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const formatDate = (date: Date): string => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dayOfWeek = days[date.getDay()];
        return `${month}월 ${day}일 (${dayOfWeek})`;
    };
    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
// 비밀번호 변경 로직
        setShowPasswordModal(false);
// 성공 메시지 표시
    };
    const handleEmailSettingChange = (setting: 'notice' | 'scholarship' | 'program') => {
        setEmailSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
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
                <div className="flex flex-col gap-8">
                    {/* 현재 날짜 및 페이지 제목 */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                        <h1 className="text-2xl font-bold text-gray-800">마이페이지</h1>
                        <p className="text-sm text-gray-500 mt-1 sm:mt-0">{formatDate(currentDate)} 기준</p>
                    </div>
                    {/* 탭 메뉴 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 flex overflow-x-auto">
                        {['프로필', '계정관리', '활동내역', '알림설정'].map((section) => (
                            <button
                                key={section}
                                className={`px-6 py-3 text-base font-medium rounded-xl transition-all duration-200 flex-1 whitespace-nowrap cursor-pointer ${
                                    activeSection === section
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50'
                                } !rounded-button`}
                                onClick={() => setActiveSection(section as any)}
                            >
                                {section === '활동내역' ? '참여목록' : section}
                            </button>
                        ))}
                    </div>
                    {/* 활동 내역 섹션 */}
                    {activeSection === '활동내역' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* 장학 프로그램 섹션 */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <div
                                            className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                            <i className="fas fa-graduation-cap text-green-600"></i>
                                        </div>
                                        <h3 className="text-xl font-bold">장학 프로그램</h3>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all !rounded-button whitespace-nowrap cursor-pointer ${favoriteFilter === '전체' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            onClick={() => setFavoriteFilter('전체')}
                                        >
                                            전체
                                        </button>
                                        <button
                                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all !rounded-button whitespace-nowrap cursor-pointer ${favoriteFilter === '진행중' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            onClick={() => setFavoriteFilter('진행중')}
                                        >
                                            진행중
                                        </button>
                                        <button
                                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all !rounded-button whitespace-nowrap cursor-pointer ${favoriteFilter === '완료' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            onClick={() => setFavoriteFilter('완료')}
                                        >
                                            완료
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {(favoriteFilter === '전체' || favoriteFilter === '진행중') && (
                                        <div
                                            className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center">
                                                        <h4 className="font-medium">학부생 연구 프로젝트</h4>
                                                        <button
                                                            className="ml-2 text-red-500 hover:text-red-600 cursor-pointer">
                                                            <i className="fas fa-heart"></i>
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-1">2025.05.15 ~
                                                        2025.08.31</p>
                                                    <div className="flex items-center mt-2">
<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
학술
</span>
                                                        <span
                                                            className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full ml-2">
진행중
</span>
                                                        <span
                                                            className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full ml-2">
교내외
</span>
                                                    </div>
                                                </div>
                                                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                                    <i className="fas fa-ellipsis-v"></i>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {(activityFilter === '전체' || activityFilter === '교내외') && (
                                        <div
                                            className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center">
                                                        <h4 className="font-medium">취업 역량 강화 워크샵</h4>
                                                        <button
                                                            className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer">
                                                            <i className="far fa-heart"></i>
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-1">2025.06.25 ~
                                                        2025.06.27</p>
                                                    <div className="flex items-center mt-2">
<span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
취업
</span>
                                                        <span
                                                            className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full ml-2">
예정
</span>
                                                        <span
                                                            className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full ml-2">
교내외
</span>
                                                    </div>
                                                </div>
                                                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                                    <i className="fas fa-ellipsis-v"></i>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {(activityFilter === '전체' || activityFilter === '장학금') && (
                                        <div
                                            className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center">
                                                            <h4 className="font-medium">성적우수 장학금</h4>
                                                            <button
                                                                className="ml-2 text-red-500 hover:text-red-600 cursor-pointer">
                                                                <i className="fas fa-heart"></i>
                                                            </button>
                                                        </div>
                                                        <select
                                                            className="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 !rounded-button">
                                                            <option>진행중</option>
                                                            <option>완료</option>
                                                        </select>
                                                    </div>
                                                    <p className="text-sm text-gray-500">2025.05.10 ~ 2025.06.30</p>
                                                    <div className="flex items-center mt-2 mb-3">
<span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
장학금
</span>
                                                        <span
                                                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-2">
진행중
</span>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex-1">
                                                            <input
                                                                type="text"
                                                                value="300,000"
                                                                placeholder="지원 금액 입력"
                                                                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                                            />
                                                        </div>
                                                        <button
                                                            className="px-4 py-1.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all !rounded-button whitespace-nowrap cursor-pointer">
                                                            금액 수정
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {(activityFilter === '전체' || activityFilter === '장학금') && (
                                        <div
                                            className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center">
                                                            <h4 className="font-medium">근로 장학금</h4>
                                                            <button
                                                                className="ml-2 text-red-500 hover:text-red-600 cursor-pointer">
                                                                <i className="fas fa-heart"></i>
                                                            </button>
                                                        </div>
                                                        <select
                                                            className="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 !rounded-button">
                                                            <option>진행중</option>
                                                            <option>완료</option>
                                                        </select>
                                                    </div>
                                                    <p className="text-sm text-gray-500">2025.05.20 ~ 2025.06.20</p>
                                                    <div className="flex items-center mt-2 mb-3">
<span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
장학금
</span>
                                                        <span
                                                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-2">
진행중
</span>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex-1">
                                                            <input
                                                                type="text"
                                                                value="150,000"
                                                                placeholder="지원 금액 입력"
                                                                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                                            />
                                                        </div>
                                                        <button
                                                            className="px-4 py-1.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all !rounded-button whitespace-nowrap cursor-pointer">
                                                            금액 수정
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* 교내외 프로그램 섹션 */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <div
                                            className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                            <i className="fas fa-university text-purple-600"></i>
                                        </div>
                                        <h3 className="text-xl font-bold">교내외 프로그램</h3>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all !rounded-button whitespace-nowrap cursor-pointer ${favoriteFilter === '전체' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            onClick={() => setFavoriteFilter('전체')}
                                        >
                                            전체
                                        </button>
                                        <button
                                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all !rounded-button whitespace-nowrap cursor-pointer ${favoriteFilter === '진행중' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            onClick={() => setFavoriteFilter('진행중')}
                                        >
                                            진행중
                                        </button>
                                        <button
                                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all !rounded-button whitespace-nowrap cursor-pointer ${favoriteFilter === '완료' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                            onClick={() => setFavoriteFilter('완료')}
                                        >
                                            완료
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {(favoriteFilter === '전체' || favoriteFilter === '진행중') && (
                                        <div
                                            className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-medium">학부생 연구 프로젝트</h4>
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                className="text-red-500 hover:text-red-600 cursor-pointer">
                                                                <i className="fas fa-heart"></i>
                                                            </button>
                                                            <select
                                                                className="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 !rounded-button">
                                                                <option>진행중</option>
                                                                <option>신청 예정</option>
                                                                <option>신청 완료</option>
                                                                <option>완료</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-500">마감: 2025.08.31</p>
                                                    <div className="flex items-center mt-2 mb-3">
<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
학술
</span>
                                                        <span
                                                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-2">
진행중
</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">교수님과 함께하는 학부생 연구 프로젝트 참가자
                                                        모집</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {(favoriteFilter === '전체' || favoriteFilter === '진행중') && (
                                        <div
                                            className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-medium">취업 역량 강화 워크샵</h4>
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                className="text-red-500 hover:text-red-600 cursor-pointer">
                                                                <i className="fas fa-heart"></i>
                                                            </button>
                                                            <select
                                                                className="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 !rounded-button">
                                                                <option>신청 예정</option>
                                                                <option>진행중</option>
                                                                <option>신청 완료</option>
                                                                <option>완료</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-500">마감: 2025.06.27</p>
                                                    <div className="flex items-center mt-2 mb-3">
<span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
취업
</span>
                                                        <span
                                                            className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full ml-2">
예정
</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">취업 준비를 위한 실전 면접 및 이력서 작성
                                                        워크샵</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {(favoriteFilter === '전체' || favoriteFilter === '진행중') && (
                                        <div
                                            className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-medium">캠퍼스 축제 자원봉사자</h4>
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                className="text-gray-400 hover:text-red-500 cursor-pointer">
                                                                <i className="far fa-heart"></i>
                                                            </button>
                                                            <select
                                                                className="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 !rounded-button">
                                                                <option>신청 예정</option>
                                                                <option>진행중</option>
                                                                <option>신청 완료</option>
                                                                <option>완료</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-500">마감: 2025.06.18</p>
                                                    <div className="flex items-center mt-2 mb-3">
<span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-0.5 rounded-full">
문화
</span>
                                                        <span
                                                            className="inline-block bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full ml-2">
마감임박
</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">봄 축제 진행을 위한 자원봉사자를 모집합니다</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {(favoriteFilter === '전체' || favoriteFilter === '완료') && (
                                        <div
                                            className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-medium">글로벌 인턴십 프로그램</h4>
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                className="text-red-500 hover:text-red-600 cursor-pointer">
                                                                <i className="fas fa-heart"></i>
                                                            </button>
                                                            <select
                                                                className="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 !rounded-button">
                                                                <option>완료</option>
                                                                <option>진행중</option>
                                                                <option>신청 예정</option>
                                                                <option>신청 완료</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-500">마감: 2025.01.15</p>
                                                    <div className="flex items-center mt-2 mb-3">
<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
국제
</span>
                                                        <span
                                                            className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full ml-2">
완료
</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">해외 기업 인턴십 경험을 쌓을 수 있는 프로그램</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {(favoriteFilter === '전체' || favoriteFilter === '완료') && (
                                        <div
                                            className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-medium">창업 아이디어 경진대회</h4>
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                className="text-red-500 hover:text-red-600 cursor-pointer">
                                                                <i className="fas fa-heart"></i>
                                                            </button>
                                                            <select
                                                                className="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 !rounded-button">
                                                                <option>완료</option>
                                                                <option>진행중</option>
                                                                <option>신청 예정</option>
                                                                <option>신청 완료</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-500">마감: 2024.11.30</p>
                                                    <div className="flex items-center mt-2 mb-3">
<span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full">
창업
</span>
                                                        <span
                                                            className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full ml-2">
완료
</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">혁신적인 창업 아이디어를 발굴하는 경진대회</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* 프로필 섹션 */}
                    {activeSection === '프로필' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* 프로필 카드 */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:col-span-1">
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full bg-gray-100 mb-4 overflow-hidden relative">
                                        <img
                                            src="https://readdy.ai/api/search-image?query=professional%20profile%20picture%20of%20a%20Korean%20college%20student%20with%20a%20friendly%20smile%2C%20minimalist%20background%2C%20high%20quality%20portrait%20photograph%2C%20soft%20lighting%2C%20clean%20background&width=300&height=300&seq=1&orientation=squarish"
                                            alt="프로필 이미지"
                                            className="w-full h-full object-cover"
                                        />
                                        <div
                                            className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1 border-2 border-white">
                                            <i className="fas fa-comment text-white text-xs"></i>
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-bold mb-1">김대학</h2>
                                    <div className="flex items-center mb-4">
                                        <span className="text-sm text-gray-500">평택대학교</span>
                                        {isSchoolVerified ? (
                                            <span
                                                className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full flex items-center">
<i className="fas fa-check-circle mr-1"></i> 인증완료
</span>
                                        ) : (
                                            <button
                                                className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                                                <i className="fas fa-university mr-1"></i> 학교 인증하기
                                            </button>
                                        )}
                                    </div>
                                    <div className="w-full border-t border-gray-100 pt-4 mt-2">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-600 text-sm">학번</span>
                                            <span className="font-medium">2023123456</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-600 text-sm">이메일</span>
                                            <span className="font-medium">student@ptu.ac.kr</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-600 text-sm">학교 이메일</span>
                                            {isSchoolVerified ? (
                                                <span className="font-medium flex items-center">
student@snu.ac.kr
<i className="fas fa-check-circle text-blue-500 ml-1.5"></i>
</span>
                                            ) : (
                                                <button
                                                    className="text-sm text-blue-600 font-medium cursor-pointer !rounded-button whitespace-nowrap">
                                                    이메일 인증하기
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 text-sm">가입일</span>
                                            <span className="font-medium">2025.01.15</span>
                                        </div>
                                    </div>
                                    <div className="w-full mt-6">
                                        <div
                                            className="flex items-center bg-yellow-50 rounded-xl p-3 border border-yellow-100">
                                            <div
                                                className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center mr-3">
                                                <i className="fas fa-comment text-white"></i>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-700">카카오 계정 연동됨</p>
                                                <p className="text-xs text-gray-500">kakao@example.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 장학금 현황 카드 */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:col-span-2">
                                <h3 className="text-xl font-bold mb-6">장학금 현황</h3>
                                <div className="mb-6">
                                    <div className="flex items-center mb-2">
                                        <span className="text-gray-700 font-medium">2025년 1학기 장학금 현황</span>
                                        <span className="ml-2 text-xs text-gray-500">(최근 업데이트: 2025.06.02)</span>
                                    </div>
                                    <div
                                        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                                        <div className="flex items-center">
                                            <div
                                                className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                                <i className="fas fa-award text-green-600 text-xl"></i>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">현재 누적 장학금</p>
                                                <p className="text-2xl font-bold text-green-600 mt-1">450,000 원</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-gray-50 rounded-2xl p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">솔선수범 장학금</p>
                                                <p className="text-lg font-bold text-gray-800">200,000 원</p>
                                                <p className="text-xs text-gray-500 mt-1">최대 700,000 원</p>
                                            </div>
                                            <div
                                                className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                <i className="fas fa-star text-green-600"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">진행중인 프로그램</p>
                                                <p className="text-lg font-bold text-gray-800">3 개</p>
                                                <p className="text-xs text-gray-500 mt-1">장학금 지원</p>
                                            </div>
                                            <div
                                                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <i className="fas fa-clock text-blue-600"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">완료된 프로그램</p>
                                                <p className="text-lg font-bold text-gray-800">4 개</p>
                                                <p className="text-xs text-gray-500 mt-1">장학금 수혜</p>
                                            </div>
                                            <div
                                                className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                <i className="fas fa-check-circle text-purple-600"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="font-medium text-gray-700 mb-3">장학금 수혜 내역</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">학기</th>
                                            <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">장학금명</th>
                                            <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">금액</th>
                                            <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">상태</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                                            <td className="py-3 px-2 text-sm">2025-1</td>
                                            <td className="py-3 px-2 text-sm font-medium">성적우수 장학금</td>
                                            <td className="py-3 px-2 text-sm">300,000 원</td>
                                            <td className="py-3 px-2">
<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
지급완료
</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                                            <td className="py-3 px-2 text-sm">2025-1</td>
                                            <td className="py-3 px-2 text-sm font-medium">근로 장학금</td>
                                            <td className="py-3 px-2 text-sm">150,000 원</td>
                                            <td className="py-3 px-2">
<span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
지급예정
</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50">
                                            <td className="py-3 px-2 text-sm">2024-2</td>
                                            <td className="py-3 px-2 text-sm font-medium">국가장학금 1유형</td>
                                            <td className="py-3 px-2 text-sm">1,200,000 원</td>
                                            <td className="py-3 px-2">
<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
지급완료
</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* 계정 관리 섹션 */}
                    {activeSection === '계정관리' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* 개인정보 수정 카드 */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center mb-6">
                                    <div
                                        className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                        <i className="fas fa-user-edit text-blue-600"></i>
                                    </div>
                                    <h3 className="text-xl font-bold">개인정보 수정</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-200"
                                            value="김대학"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">학번</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-200"
                                            value="2023123456"
                                            disabled
                                        />
                                        <p className="text-xs text-gray-500 mt-1">학번은 변경할 수 없습니다.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-200"
                                            value="student@snu.ac.kr"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">학과</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-200"
                                            value="컴퓨터공학과"
                                        />
                                    </div>
                                    <button
                                        className="w-full bg-gradient-to-r from-green-500 to-emerald-400 text-white py-3 rounded-xl text-base font-medium hover:shadow-md transition-all duration-300 mt-4 !rounded-button whitespace-nowrap cursor-pointer">
                                        변경사항 저장
                                    </button>
                                </div>
                            </div>
                            {/* 비밀번호 변경 및 계정 관리 카드 */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center mb-6">
                                    <div
                                        className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                        <i className="fas fa-lock text-purple-600"></i>
                                    </div>
                                    <h3 className="text-xl font-bold">보안 및 계정 관리</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-medium mb-1">비밀번호 변경</h4>
                                                <p className="text-sm text-gray-500">비밀번호를 정기적으로 변경하여 계정을 안전하게
                                                    보호하세요.</p>
                                            </div>
                                            <button
                                                className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all !rounded-button whitespace-nowrap cursor-pointer"
                                                onClick={() => setShowPasswordModal(true)}
                                            >
                                                변경하기
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-medium mb-1">소셜 계정 연동</h4>
                                                <p className="text-sm text-gray-500">소셜 계정을 연동하여 간편하게 로그인하세요.</p>
                                            </div>
                                            <div className="flex items-center">
                                                <button
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${isKakaoConnected ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-400'} cursor-pointer !rounded-button whitespace-nowrap`}>
                                                    <i className="fas fa-comment"></i>
                                                </button>
                                                <button
                                                    className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap">
                                                    <i className="fab fa-google"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-medium text-red-700 mb-1">회원 탈퇴</h4>
                                                <p className="text-sm text-red-600">모든 데이터가 영구적으로 삭제됩니다.</p>
                                            </div>
                                            <button
                                                className="px-4 py-2 bg-white text-red-600 rounded-lg border border-red-200 hover:bg-red-50 transition-all !rounded-button whitespace-nowrap cursor-pointer"
                                                onClick={() => setShowDeleteModal(true)}
                                            >
                                                탈퇴하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 로그아웃 버튼 */}
                            <div className="lg:col-span-2">
                                <a
                                    href="#"
                                    className="w-full bg-white text-gray-700 py-4 rounded-xl text-base font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center shadow-sm !rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    <i className="fas fa-sign-out-alt mr-2"></i>
                                    로그아웃
                                </a>
                            </div>
                        </div>
                    )}
                    {/* 알림 설정 섹션 */}
                    {activeSection === '알림설정' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* 이메일 알림 설정 */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center mb-6">
                                    <div
                                        className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                        <i className="fas fa-envelope text-indigo-600"></i>
                                    </div>
                                    <h3 className="text-xl font-bold">이메일 알림 설정</h3>
                                </div>
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">공지 알림</h4>
                                            <p className="text-sm text-gray-500 mt-0.5">중요 공지사항 및 업데이트 소식</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={emailSettings.notice}
                                                onChange={() => handleEmailSettingChange('notice')}
                                            />
                                            <div
                                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">장학금 신청 결과</h4>
                                            <p className="text-sm text-gray-500 mt-0.5">장학금 신청 결과 및 지급 알림</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={emailSettings.scholarship}
                                                onChange={() => handleEmailSettingChange('scholarship')}
                                            />
                                            <div
                                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">추천 프로그램</h4>
                                            <p className="text-sm text-gray-500 mt-0.5">내 관심사에 맞는 프로그램 추천</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={emailSettings.program}
                                                onChange={() => handleEmailSettingChange('program')}
                                            />
                                            <div
                                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-400 text-white py-3 rounded-xl text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                                    설정 저장하기
                                </button>
                            </div>
                            {/* 개인정보 동의 내역 */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center mb-6">
                                    <div
                                        className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                                        <i className="fas fa-shield-alt text-amber-600"></i>
                                    </div>
                                    <h3 className="text-xl font-bold">개인정보 동의 내역</h3>
                                </div>
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">필수 개인정보 수집 및 이용</h4>
                                            <p className="text-sm text-gray-500 mt-0.5">이름, 학번, 이메일, 학과 정보</p>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-xs text-gray-500 mr-2">2025.01.15 동의</span>
                                            <div
                                                className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                                <i className="fas fa-check text-green-600 text-xs"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">마케팅 정보 수신 동의</h4>
                                            <p className="text-sm text-gray-500 mt-0.5">이메일, 푸시 알림을 통한 정보 수신</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked/>
                                            <div
                                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">제3자 정보 제공 동의</h4>
                                            <p className="text-sm text-gray-500 mt-0.5">장학금 지급 기관에 정보 제공</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked/>
                                            <div
                                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                        </label>
                                    </div>
                                </div>
                                <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-100">
                                    <div className="flex items-start">
                                        <div className="text-blue-500 mt-0.5 mr-3">
                                            <i className="fas fa-info-circle"></i>
                                        </div>
                                        <p className="text-sm text-blue-700">
                                            개인정보 처리방침은 언제든지 <a href="#" className="underline font-medium">개인정보
                                            처리방침</a> 페이지에서 확인하실 수 있습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
            {/* 비밀번호 변경 모달 */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-fadeIn">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">비밀번호 변경</h3>
                            <button
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                onClick={() => setShowPasswordModal(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-200"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({
                                        ...passwordForm,
                                        currentPassword: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-200"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">8자 이상, 영문/숫자/특수문자 조합</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호 확인</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-all duration-200"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({
                                        ...passwordForm,
                                        confirmPassword: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="button"
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl text-base font-medium hover:bg-gray-200 transition-all !rounded-button whitespace-nowrap cursor-pointer"
                                    onClick={() => setShowPasswordModal(false)}
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white py-3 rounded-xl text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                                >
                                    변경하기
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* 회원 탈퇴 모달 */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-fadeIn">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-red-600">회원 탈퇴</h3>
                            <button
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="bg-red-50 p-4 rounded-xl mb-4">
                            <div className="flex">
                                <div className="text-red-500 mt-0.5 mr-3">
                                    <i className="fas fa-exclamation-circle"></i>
                                </div>
                                <div>
                                    <h4 className="font-medium text-red-700">주의사항</h4>
                                    <p className="text-sm text-red-600 mt-1">
                                        회원 탈퇴 시 모든 개인정보 및 활동 내역이 영구적으로 삭제되며, 복구가 불가능합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 mb-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="confirm1"
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <label htmlFor="confirm1" className="ml-2 text-sm text-gray-700">
                                    모든 개인정보가 삭제됨을 이해했습니다.
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="confirm2"
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <label htmlFor="confirm2" className="ml-2 text-sm text-gray-700">
                                    장학금 신청 내역 및 수혜 정보가 삭제됨을 이해했습니다.
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="confirm3"
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <label htmlFor="confirm3" className="ml-2 text-sm text-gray-700">
                                    탈퇴 후에는 동일한 계정으로 재가입이 제한될 수 있음을 이해했습니다.
                                </label>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl text-base font-medium hover:bg-gray-200 transition-all !rounded-button whitespace-nowrap cursor-pointer"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                취소
                            </button>
                            <button
                                className="flex-1 bg-red-500 text-white py-3 rounded-xl text-base font-medium hover:bg-red-600 transition-all !rounded-button whitespace-nowrap cursor-pointer"
                            >
                                탈퇴하기
                            </button>
                        </div>
                    </div>
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