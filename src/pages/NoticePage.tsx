// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activeTab, setActiveTab] = useState<'홈' | '장학금' | '프로그램' | 'MY'>('홈');
    const [noticeList, setNoticeList] = useState([
        {
            id: 1,
            tag: '공지',
            title: '5월 업데이트: 새로운 장학금 알림 기능이 추가되었습니다',
            date: '2025.05.20',
            content: `안녕하세요, 피팁 사용자 여러분!
저희는 여러분의 학업 여정을 더욱 효과적으로 지원하기 위해 새로운 장학금 알림 기능을 출시하게 되었습니다. 이번 업데이트를 통해 여러분에게 꼭 맞는 장학금 정보를 놓치지 않고 받아볼 수 있게 되었습니다.
주요 기능:
• 맞춤형 장학금 알림: 여러분의 학과, 학년, 성적 등을 기반으로 적합한 장학금을 자동으로 추천해 드립니다.
• 마감 임박 알림: 신청 마감이 다가오는 장학금에 대한 알림을 받아보세요.
• 새로운 장학금 정보: 새롭게 등록된 장학금 정보를 실시간으로 확인할 수 있습니다.
• 관심 장학금 모아보기: 관심 있는 장학금을 저장하고 한 곳에서 관리할 수 있습니다.
사용 방법:
1. 마이페이지에서 '알림 설정'을 클릭하세요.
2. 받고 싶은 알림 유형을 선택하세요.
3. 관심 분야와 조건을 설정하면 맞춤형 알림을 받을 수 있습니다.
4. 알림은 앱 내 알림 및 이메일로 전송됩니다.
이 기능을 통해 여러분이 더 많은 장학 기회를 놓치지 않고 활용하실 수 있기를 바랍니다.
항상 더 나은 서비스를 제공하기 위해 노력하겠습니다.
감사합니다.
피팁 팀 드림`
        },
        {
            id: 2,
            tag: '공지',
            title: '서비스 점검 안내 (6월 5일 02:00~04:00)',
            date: '2025.06.01',
            content: '서버 점검으로 인해 일시적으로 서비스 이용이 제한됩니다.'
        },
        {
            id: 3,
            tag: '공지',
            title: '개인정보처리방침 개정 안내',
            date: '2025.05.15',
            content: '개인정보처리방침이 개정되었습니다. 주요 변경사항을 확인해주세요.'
        },
        {
            id: 4,
            tag: '공지',
            title: '2025학년도 1학기 장학금 신청 안내',
            date: '2025.05.10',
            content: '2025학년도 1학기 교내 장학금 신청 기간을 안내합니다.'
        },
        {
            id: 5,
            tag: '공지',
            title: '피팁 서비스 베타테스트 종료 및 정식 출시 안내',
            date: '2025.04.20',
            content: '성공적인 베타테스트를 마치고 정식 서비스를 시작합니다.'
        }
    ]);
    const [selectedNotice, setSelectedNotice] = useState(noticeList[0]);
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
    const openModal = (notice: any) => {
        setSelectedNotice(notice);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 relative">
            {/* 상단 네비게이션 */}
            <header
                className="bg-white/80 text-gray-800 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-gray-100/50">
                <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 py-5">
                    <div className="flex items-center">
                        <a
                            href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/56654ed9-c57f-404a-9175-fba93b9db6d3"
                            data-readdy="true"
                            className="mr-4 text-gray-600 hover:text-green-600 cursor-pointer"
                        >
                            <i className="fas fa-arrow-left text-lg"></i>
                        </a>
                        <h1 className="text-xl font-bold">공지사항</h1>
                    </div>
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
                        <div className="w-8"></div>
                    )}
                </div>
            </header>
            {/* 메인 컨텐츠 */}
            <main className="flex-1 px-4 sm:px-6 py-8 max-w-[1280px] mx-auto w-full pb-20 md:pb-8">
                <div className="flex flex-col gap-6">
                    {/* 공지사항 헤더 */}
                    <div
                        className="bg-gradient-to-br from-white to-gray-50/80 rounded-3xl p-8 shadow-sm border border-gray-100/50">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-4">
                            공지사항
                        </h2>
                        <p className="text-gray-600">
                            피팁의 최신 소식과 업데이트 정보를 확인하세요.
                        </p>
                    </div>
                    {/* 공지사항 리스트 */}
                    <div
                        className="bg-gradient-to-br from-white to-gray-50/80 rounded-3xl shadow-sm border border-gray-100/50 overflow-hidden">
                        <ul className="divide-y divide-gray-100">
                            {noticeList.map((notice) => (
                                <li
                                    key={notice.id}
                                    className="hover:bg-gray-50/80 transition-colors duration-200 cursor-pointer"
                                    onClick={() => openModal(notice)}
                                >
                                    <div className="flex justify-between items-center p-6">
                                        <div className="flex-1">
                                            <div className="flex items-center mb-2">
<span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium mr-2">
{notice.tag}
</span>
                                                <span className="text-sm text-gray-500">{notice.date}</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
                                        </div>
                                        <div className="text-gray-400">
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
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
            {/* 공지사항 모달 */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div
                        className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-xl animate-fadeIn">
                        <div className="flex justify-between items-center border-b border-gray-100 p-6">
                            <h3 className="text-xl font-bold text-gray-800">{selectedNotice.title}</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto" style={{maxHeight: 'calc(80vh - 140px)'}}>
                            <div className="flex items-center mb-4">
<span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium mr-2">
{selectedNotice.tag}
</span>
                                <span className="text-sm text-gray-500">{selectedNotice.date}</span>
                            </div>
                            {selectedNotice.id === 1 && (
                                <div className="space-y-6">
                                    <p className="text-gray-700 whitespace-pre-line">{selectedNotice.content}</p>
                                    <div className="mt-8 space-y-6">
                                        <h4 className="text-lg font-semibold text-gray-800">주요 기능 상세 설명</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                                <div className="flex items-center mb-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                                        <i className="fas fa-bell text-green-600"></i>
                                                    </div>
                                                    <h5 className="font-semibold">맞춤형 장학금 알림</h5>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    사용자 프로필 정보를 기반으로 적합한 장학금을 자동으로 추천해드립니다. 학과, 학년, 성적 등에 맞는 장학금 정보만 받아볼
                                                    수 있습니다.
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                                <div className="flex items-center mb-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                                        <i className="fas fa-clock text-red-600"></i>
                                                    </div>
                                                    <h5 className="font-semibold">마감 임박 알림</h5>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    신청 마감이 다가오는 장학금에 대한 알림을 받아보세요. 마감 7일 전, 3일 전, 1일 전에 알림을 통해 중요한 기회를
                                                    놓치지 않도록 도와드립니다.
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                                <div className="flex items-center mb-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                                        <i className="fas fa-newspaper text-blue-600"></i>
                                                    </div>
                                                    <h5 className="font-semibold">새로운 장학금 정보</h5>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    새롭게 등록된 장학금 정보를 실시간으로 확인할 수 있습니다. 관심 분야에 맞는 새로운 장학금이 등록되면 가장 먼저
                                                    알려드립니다.
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                                <div className="flex items-center mb-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                                        <i className="fas fa-heart text-purple-600"></i>
                                                    </div>
                                                    <h5 className="font-semibold">관심 장학금 모아보기</h5>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    관심 있는 장학금을 저장하고 한 곳에서 관리할 수 있습니다. 중요한 장학금은 즐겨찾기에 추가하여 쉽게 접근하고 관리하세요.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4">사용 방법</h4>
                                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                                <div className="space-y-4">
                                                    <div className="flex items-start">
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mr-4">
                                                            1
                                                        </div>
                                                        <div>
                                                            <h5 className="font-semibold mb-1">마이페이지에서 '알림 설정' 클릭</h5>
                                                            <p className="text-sm text-gray-600">
                                                                마이페이지 메뉴에서 '알림 설정' 섹션으로 이동합니다.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mr-4">
                                                            2
                                                        </div>
                                                        <div>
                                                            <h5 className="font-semibold mb-1">알림 유형 선택</h5>
                                                            <p className="text-sm text-gray-600">
                                                                받고 싶은 알림 유형(맞춤형 알림, 마감 임박 알림, 새 장학금 알림 등)을 선택합니다.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mr-4">
                                                            3
                                                        </div>
                                                        <div>
                                                            <h5 className="font-semibold mb-1">관심 분야 및 조건 설정</h5>
                                                            <p className="text-sm text-gray-600">
                                                                학과, 장학금 유형, 금액 범위 등 관심 있는 조건을 설정하여 맞춤형 알림을 받을 수 있습니다.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div
                                                            className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mr-4">
                                                            4
                                                        </div>
                                                        <div>
                                                            <h5 className="font-semibold mb-1">알림 수신 방법 설정</h5>
                                                            <p className="text-sm text-gray-600">
                                                                앱 내 알림, 이메일, 문자 메시지 등 원하는 알림 수신 방법을 선택할 수 있습니다.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                                            <h4 className="text-lg font-semibold text-green-800 mb-2">혜택</h4>
                                            <ul className="space-y-2 text-gray-700">
                                                <li className="flex items-start">
                                                    <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                                                    <span>적합한 장학금 정보를 놓치지 않고 받아볼 수 있습니다.</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                                                    <span>마감 임박 알림으로 중요한 기회를 놓치지 않습니다.</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                                                    <span>관심 장학금을 한 곳에서 관리하여 효율적으로 장학금을 관리할 수 있습니다.</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <i className="fas fa-check-circle text-green-600 mr-2 mt-1"></i>
                                                    <span>맞춤형 추천으로 자신에게 적합한 장학금을 더 쉽게 찾을 수 있습니다.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <a
                                            href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/0d25b063-ddab-45fe-bc67-55a1a206f937"
                                            data-readdy="true"
                                            className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-full font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                                        >
                                            지금 알림 설정하기
                                            <i className="fas fa-arrow-right ml-2"></i>
                                        </a>
                                    </div>
                                </div>
                            )}
                            {selectedNotice.id !== 1 && (
                                <p className="text-gray-700">{selectedNotice.content}</p>
                            )}
                        </div>
                        <div className="border-t border-gray-100 p-6 flex justify-between items-center">
                            <span className="text-sm text-gray-500">{selectedNotice.date}</span>
                            <button
                                onClick={closeModal}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
@keyframes fadeIn {
from { opacity: 0; transform: translateY(20px); }
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