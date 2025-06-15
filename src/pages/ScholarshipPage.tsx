// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('장학금');
  const [favoriteItems, setFavoriteItems] = useState<{[key: string]: boolean}>({});
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체 카테고리');
  const [selectedStatus, setSelectedStatus] = useState<string>('전체 상태');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState<boolean>(false);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        setShowCategoryDropdown(false);
        setShowStatusDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  const [selectedAmount, setSelectedAmount] = useState<string>('전체');
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;
  
  const applyFilters = () => {
    setShowFilter(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  
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
  
  const openDetailModal = (program: any) => {
    setSelectedProgram(program);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeDetailModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };
  
  const scholarshipPrograms = [
    {
      id: '1',
      name: '취업진로특강',
      department: '취업진로센터',
      minAmount: 30000,
      maxAmount: 30000,
      deadline: '2025-06-30',
      status: '진행중',
      description: '취업 시장의 변화와 트렌드를 반영한 취업특강을 통해 취업역량을 강화하는 프로그램입니다.',
      requirements: '재학생 누구나 참여 가능',
      documents: '참여 신청서',
      procedure: '온라인 신청 → 특강 참여 → 만족도 조사'
    },
    {
      id: '2',
      name: '홍보영상제작, 사진촬영',
      department: 'PTU홍보센터',
      minAmount: 15000,
      maxAmount: 150000,
      deadline: '2025-06-15',
      status: '진행중',
      description: '졸업작품 제작, 홍보영상, 교내 홍보물 사진 촬영 모델 활동을 통한 장학금 프로그램입니다.',
      requirements: '사진/영상 촬영 참여 가능한 재학생',
      documents: '활동 신청서, 포트폴리오(선택)',
      procedure: '신청서 제출 → 활동 참여 → 결과물 제출'
    },
    {
      id: '3',
      name: '개인상담',
      department: '학생생활상담센터',
      minAmount: 15000,
      maxAmount: 100000,
      deadline: '2025-07-10',
      status: '진행중',
      description: '집단대 채무상담 대체, 개인상담과 심리검사(1회 50분) 제공하는 프로그램입니다.',
      requirements: '상담을 희망하는 재학생',
      documents: '상담 신청서',
      procedure: '상담 신청 → 상담사 배정 → 상담 진행'
    },
    {
      id: '4',
      name: '재학생 집단상담',
      department: '학생생활상담센터',
      minAmount: 50000,
      maxAmount: 100000,
      deadline: '2025-06-20',
      status: '진행중',
      description: '집단의 요구에 맞춘 주제, 운영방식, 내용 등을 협의하여 진행하는 집단상담 프로그램입니다.',
      requirements: '집단상담 참여를 희망하는 재학생',
      documents: '집단상담 신청서',
      procedure: '신청서 제출 → 그룹 배정 → 상담 진행'
    },
    {
      id: '5',
      name: '도서관 학습도우미',
      department: '중앙도서관',
      minAmount: 20000,
      maxAmount: 200000,
      deadline: '2025-06-25',
      status: '마감임박',
      description: '도서관 이용 안내, 자료 정리, 학습 공간 관리 등을 통해 교내 학습 환경을 개선하는 프로그램입니다.',
      requirements: '도서관 근로 가능한 재학생',
      documents: '신청서, 시간표',
      procedure: '신청서 제출 → 면접 → 활동 진행'
    },
    {
      id: '6',
      name: '글로벌 버디',
      department: '국제교류센터',
      minAmount: 50000,
      maxAmount: 300000,
      deadline: '2025-07-05',
      status: '진행중',
      description: '외국인 유학생들의 학교생활 적응을 돕고 문화교류 활동을 진행하는 프로그램입니다.',
      requirements: '영어 의사소통 가능자',
      documents: '신청서, 어학성적증명서(선택)',
      procedure: '신청서 제출 → 매칭 → 활동 진행'
    },
    {
      id: '7',
      name: '학과 멘토링',
      department: '학생지원센터',
      minAmount: 30000,
      maxAmount: 150000,
      deadline: '2025-06-18',
      status: '마감임박',
      description: '신입생들의 학교생활 적응과 학업을 돕는 선배 멘토링 프로그램입니다.',
      requirements: '3학년 이상 재학생, 평점 3.5 이상',
      documents: '신청서, 성적증명서',
      procedure: '신청서 제출 → 멘토 선발 → 활동 진행'
    },
    {
      id: '8',
      name: '창업 아이디어 공모전',
      department: '창업지원단',
      minAmount: 100000,
      maxAmount: 500000,
      deadline: '2025-07-15',
      status: '진행중',
      description: '혁신적인 창업 아이디어를 발굴하고 사업화를 지원하는 프로그램입니다.',
      requirements: '창업에 관심 있는 재학생',
      documents: '사업계획서, 포트폴리오',
      procedure: '계획서 제출 → 심사 → 발표 → 시상'
    }
  ];
  
  const filteredPrograms = scholarshipPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체 카테고리' || selectedCategory === program.department;
    const matchesStatus = selectedStatus === '전체 상태' || program.status === selectedStatus;
    const matchesAmount = selectedAmount === '전체' ||
                         (selectedAmount === '5만원 미만' && program.maxAmount < 50000) ||
                         (selectedAmount === '5만원~10만원' && program.maxAmount >= 50000 && program.maxAmount <= 100000) ||
                         (selectedAmount === '10만원 이상' && program.maxAmount > 100000);
    return matchesSearch && matchesCategory && matchesStatus && matchesAmount;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* 상단 헤더 */}
      <header className="bg-white/80 text-gray-800 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-gray-100/50">
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
          {/* Toast Message */}
          {showToast && (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fadeIn">
              <div className="flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                필터가 적용되었습니다
              </div>
            </div>
          )}
          {isMobile && (
            <div className="w-8"></div>
          )}
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-[1280px] mx-auto w-full pb-20 md:pb-8">
        <div className="flex flex-col gap-8">
          {/* 페이지 헤더 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">교내 솔선수범 장학금 프로그램</h1>
              <p className="text-gray-600 mt-2">학생들의 자발적인 성장과 발전을 지원하는 다양한 장학 프로그램을 확인하세요.</p>
            </div>
            <a
              href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/56654ed9-c57f-404a-9175-fba93b9db6d3"
              data-readdy="true"
              className="flex items-center text-green-600 hover:text-green-700 font-medium cursor-pointer"
            >
              <i className="fas fa-arrow-left mr-2"></i> 뒤로가기
            </a>
          </div>

          {/* 장학금 기본 정보 섹션 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300">
            <h2 className="text-xl font-bold mb-6 text-gray-800">솔선수범 장학금 안내</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center mr-4 mt-1 shadow-sm border border-green-100">
                  <i className="fas fa-star text-green-600 text-lg"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">장학금 개요</h3>
                  <p className="text-gray-600">솔선수범 장학으로 인정되는 부서별 프로그램에 참여한 학생에게 포인트를 부여하고 적립된 포인트를 장학금으로 지급합니다.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center mr-4 mt-1 shadow-sm border border-blue-100">
                  <i className="fas fa-coins text-blue-600 text-lg"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">장학금 지급</h3>
                  <p className="text-gray-600">· 학기별 1회 지급</p>
                  <p className="text-gray-600">· 최대 70만 포인트까지 인정</p>
                  <p className="text-gray-600">· 5만 포인트 미만 시 장학금 지급 불가</p>
                  <p className="text-gray-600">· 포인트는 장학금액과 일치</p>
                </div>
              </div>
            </div>
          </div>

          {/* 검색 및 필터 섹션 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100/50">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="프로그램명 또는 키워드 검색"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors flex items-center !rounded-button whitespace-nowrap cursor-pointer"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <i className="fas fa-filter mr-2 text-green-600"></i> 필터
                </button>
                <div className="flex gap-2">
                  {/* Custom Category Dropdown */}
                  <div className="relative">
                    <button
                      className="bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 cursor-pointer flex items-center justify-between min-w-[140px]"
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    >
                      {selectedCategory}
                      <i className={`fas fa-chevron-down ml-2 transition-transform duration-200 ${showCategoryDropdown ? 'transform rotate-180' : ''}`}></i>
                    </button>
                    {showCategoryDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20 animate-fadeIn">
                        {['전체 카테고리', '교내', '연구', '국제'].map((category) => (
                          <div
                            key={category}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center justify-between ${selectedCategory === category ? 'text-green-600 bg-green-50' : 'text-gray-700'}`}
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowCategoryDropdown(false);
                            }}
                          >
                            {category}
                            {selectedCategory === category && <i className="fas fa-check text-green-600"></i>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Custom Status Dropdown */}
                  <div className="relative">
                    <button
                      className="bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 cursor-pointer flex items-center justify-between min-w-[140px]"
                      onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    >
                      {selectedStatus}
                      <i className={`fas fa-chevron-down ml-2 transition-transform duration-200 ${showStatusDropdown ? 'transform rotate-180' : ''}`}></i>
                    </button>
                    {showStatusDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20 animate-fadeIn">
                        {['전체 상태', '진행중', '마감임박', '마감'].map((status) => (
                          <div
                            key={status}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center justify-between ${selectedStatus === status ? 'text-green-600 bg-green-50' : 'text-gray-700'}`}
                            onClick={() => {
                              setSelectedStatus(status);
                              setShowStatusDropdown(false);
                            }}
                          >
                            {status}
                            {selectedStatus === status && <i className="fas fa-check text-green-600"></i>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {showFilter && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">장학금액</h3>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="amount"
                          value="전체"
                          checked={selectedAmount === "전체"}
                          onChange={() => setSelectedAmount("전체")}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">전체</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="amount"
                          value="5만원 미만"
                          checked={selectedAmount === "5만원 미만"}
                          onChange={() => setSelectedAmount("5만원 미만")}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">5만원 미만</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="amount"
                          value="5만원~10만원"
                          checked={selectedAmount === "5만원~10만원"}
                          onChange={() => setSelectedAmount("5만원~10만원")}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">5만원~10만원</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="amount"
                          value="10만원 이상"
                          checked={selectedAmount === "10만원 이상"}
                          onChange={() => setSelectedAmount("10만원 이상")}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">10만원 이상</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">정렬 기준</h3>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="sort" value="마감일순" className="mr-2" defaultChecked />
                        <span className="text-sm text-gray-600">마감일순</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="sort" value="금액순" className="mr-2" />
                        <span className="text-sm text-gray-600">금액순</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="sort" value="인기순" className="mr-2" />
                        <span className="text-sm text-gray-600">인기순</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors mr-2 !rounded-button whitespace-nowrap cursor-pointer">
                    초기화
                  </button>
                  <button
                    onClick={applyFilters}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                    적용하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 프로그램 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map(program => (
              <div
                key={program.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 relative"
              >
                <div
                  className="absolute top-6 right-6 cursor-pointer transform transition-transform duration-300 hover:scale-110"
                  onClick={() => toggleFavorite(program.id)}
                >
                  <i className={`${favoriteItems[program.id] ? 'fas text-red-500' : 'far text-gray-400'} fa-heart text-xl`}></i>
                </div>
                <div className="mb-2">
                  <span className={`inline-block ${
                    program.status === '마감임박' ? 'bg-red-100 text-red-800' :
                    program.status === '진행중' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  } text-sm px-3 py-1 rounded-full font-medium`}>
                    {program.status} {program.status === '마감임박' && `(~${program.deadline.slice(5)})`}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-base text-gray-700">
                    <i className="fas fa-building mr-2 text-green-600"></i>
                    <span>{program.department}</span>
                  </div>
                  <div className="flex items-center text-base text-gray-700">
                    <i className="fas fa-coins mr-2 text-blue-600"></i>
                    <span>{program.minAmount.toLocaleString()}원 ~ {program.maxAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex items-center text-base text-gray-700 col-span-2">
                    <i className="fas fa-calendar-alt mr-2 text-purple-600"></i>
                    <span>마감일: {program.deadline}</span>
                  </div>
                </div>
                <p className="text-base text-gray-700 mb-4">
                  {program.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl text-base font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                    onClick={() => openDetailModal(program)}
                  >
                    상세정보 보기
                    <i className="fas fa-chevron-right ml-2"></i>
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white py-3 rounded-xl text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer group">
                    신청하기
                    <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50 text-center col-span-2">
              <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-700 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600">다른 검색어나 필터 조건을 시도해보세요.</p>
            </div>
          )}
        </div>

        {/* FAQ 섹션 */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 mt-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">자주 묻는 질문</h2>
          <div className="flex flex-col gap-4">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-lg font-medium mb-2 text-gray-800">실제로 장학금이 연동되나요?</h3>
              <p className="text-gray-600">이 사이트는 프로그램을 신청하고 관리를 직접 하기 위한 플랫폼으로, 실제 학교와 연계되어 있지 않습니다. 실제 장학금 신청은 학교 포털을 통해 진행해 주시기 바랍니다.</p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-lg font-medium mb-2 text-gray-800">장학금 신청은 어떻게 하나요?</h3>
              <p className="text-gray-600">
                ① 포털(e-학사)로그인 → 학부학생서비스 → 학적관리 → 학생정보<br/>
                ② 신상정보 탭 클릭<br/>
                ③ 은행정보 입력(예금주, 은행구분, 계좌번호)<br/>
                ④ 통장사본파일 업로드(통장사본 스캔 or 예금주 및 계좌번호가 확인되는 사진 or 은행 어플캡쳐본)<br/>
                ⑤ 저장 클릭
              </p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-lg font-medium mb-2 text-gray-800">신청 기간은 언제인가요?</h3>
              <p className="text-gray-600">학기말(6월중) 솔선수범 장학금 신청기간에 신청 가능합니다. 정확한 신청 기간은 학교 공지사항을 참고해 주시기 바랍니다.</p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-lg font-medium mb-2 text-gray-800">장학금 포인트는 어떻게 적립되나요?</h3>
              <p className="text-gray-600">각 프로그램 참여 시 부여되는 포인트가 자동으로 적립되며, 최대 70만 포인트까지 인정됩니다. 5만 포인트 미만인 경우 장학금 지급이 불가합니다.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">등록금 초과 수혜가 가능한가요?</h3>
              <p className="text-gray-600">솔선수범 장학금은 대가성 장학금으로 등록금 범위를 초과하여 수혜가 가능합니다.</p>
            </div>
          </div>
        </div>
      </main>

      {/* 모바일 하단 네비게이션 */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center z-10">
          <a
            href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/56654ed9-c57f-404a-9175-fba93b9db6d3"
            data-readdy="true"
            className="flex flex-col items-center text-gray-500 hover:text-green-600 transition-colors duration-200 cursor-pointer"
          >
            <i className="fas fa-home text-lg mb-1"></i>
            <span className="text-xs">홈</span>
          </a>
          <button
            className="flex flex-col items-center text-green-600 cursor-pointer"
          >
            <i className="fas fa-graduation-cap text-lg mb-1"></i>
            <span className="text-xs">장학 프로그램</span>
          </button>
          <a
            href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/b392cf82-d87d-4142-9459-7fa41c94c62d"
            data-readdy="true"
            className="flex flex-col items-center text-gray-500 hover:text-green-600 transition-colors duration-200 cursor-pointer"
          >
            <i className="fas fa-calendar-alt text-lg mb-1"></i>
            <span className="text-xs">교내외 프로그램</span>
          </a>
          <a
            href="https://readdy.ai/home/642620c0-5557-4587-b200-3db6fc619d3d/0d25b063-ddab-45fe-bc67-55a1a206f937"
            data-readdy="true"
            className="flex flex-col items-center text-gray-500 hover:text-green-600 transition-colors duration-200 cursor-pointer"
          >
            <i className="fas fa-user text-lg mb-1"></i>
            <span className="text-xs">마이페이지</span>
          </a>
        </div>
      )}

      {/* 상세정보 모달 */}
      {showModal && selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-3xl">
              <h3 className="text-xl font-bold text-gray-800">{selectedProgram.name} 상세정보</h3>
              <button 
                onClick={closeDetailModal}
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-block ${
                    selectedProgram.status === '마감임박' ? 'bg-red-100 text-red-800' :
                    selectedProgram.status === '진행중' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  } text-sm px-3 py-1 rounded-full font-medium`}>
                    {selectedProgram.status} {selectedProgram.status === '마감임박' && `(~${selectedProgram.deadline.slice(5)})`}
                  </span>
                  <div 
                    className="cursor-pointer transform transition-transform duration-300 hover:scale-110"
                    onClick={() => toggleFavorite(selectedProgram.id)}
                  >
                    <i className={`${favoriteItems[selectedProgram.id] ? 'fas text-red-500' : 'far text-gray-400'} fa-heart text-xl`}></i>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-base text-gray-700">
                    <i className="fas fa-building mr-2 text-green-600"></i>
                    <span>담당 부서: {selectedProgram.department}</span>
                  </div>
                  <div className="flex items-center text-base text-gray-700">
                    <i className="fas fa-coins mr-2 text-blue-600"></i>
                    <span>장학금액: {selectedProgram.minAmount.toLocaleString()}원 ~ {selectedProgram.maxAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex items-center text-base text-gray-700">
                    <i className="fas fa-calendar-alt mr-2 text-purple-600"></i>
                    <span>마감일: {selectedProgram.deadline}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <h4 className="text-lg font-medium mb-3">프로그램 설명</h4>
                  <p className="text-gray-700">{selectedProgram.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="text-lg font-medium mb-3 flex items-center">
                    <i className="fas fa-clipboard-list text-green-600 mr-2"></i> 신청 자격 요건
                  </h4>
                  <p className="text-gray-700">{selectedProgram.requirements}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="text-lg font-medium mb-3 flex items-center">
                    <i className="fas fa-file-alt text-blue-600 mr-2"></i> 제출 서류
                  </h4>
                  <p className="text-gray-700">{selectedProgram.documents}</p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-xl mb-6">
                <h4 className="text-lg font-medium mb-3 flex items-center">
                  <i className="fas fa-tasks text-purple-600 mr-2"></i> 신청 절차
                </h4>
                <p className="text-gray-700">{selectedProgram.procedure}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl text-base font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-share-alt mr-1.5"></i> 공유하기
                </button>
                <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl text-base font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-download mr-1.5"></i> 안내문 다운로드
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white py-3 rounded-xl text-base font-medium hover:shadow-md transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer group">
                  신청하기
                  <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fadeIn">
          <div className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            필터가 적용되었습니다
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

export default App;
