INSERT INTO user_tb (idx, nickname, type, age, gender) 
VALUES (1, 'nickname', 'BASIC', 25, 'FEMALE');

INSERT INTO user_basic_tb (user_idx, id, password, email) 
VALUES (1, 'heeju', 'password', 'test2@example.com');

INSERT INTO book_tb (
    idx, 
    title, 
    author, 
    publisher, 
    publication_year,
    description,
    book_file_path, 
    cover_image_path, 
    average_rating, 
    ratings_count, 
    language_code, 
    isbn13,
    korean_title, 
    korean_author, 
    korean_cover_path,
    created_at
) VALUES 
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner', 1925, '1920년대 미국의 부와 사랑, 그리고 상실을 그린 위대한 걸작.', 'book/1.epub', 'cover/1.jpg', 4.5, 1230, 'en', '9780743273565', '위대한 개츠비', 'F. 스콧 피츠제럴드', NULL, NOW()),
(2, '1984', 'George Orwell', 'Harcourt Brace', 1949, '빅 브라더가 지배하는 전체주의 사회의 공포를 그린 소설.', 'book/2.pdf', 'cover/2.jpg', 4.7, 980, 'en', '9780451524935', '1984', '조지 오웰', NULL, NOW()),
(3, 'Le Petit Prince', 'Antoine de Saint-Exupéry', 'Gallimard', 1943, '사막에 불시착한 조종사가 만난 어린 왕자와의 이야기.', 'book/3.epub', 'cover/3.jpg', 4.8, 2500, 'fr', '9780156012195', '어린 왕자', '앙투안 드 생텍쥐페리', 'cover/3_ko.jpg', NOW()),
(4, 'Demian', 'Hermann Hesse', 'S. Fischer Verlag', 1919, '알이 깨지고 새로운 세계가 태어나는 과정을 그린 성장 소설.', 'book/4.epub', 'cover/4.jpg', 4.6, 760, 'de', '9780140181149', '데미안', '헤르만 헤세', NULL, NOW()),
(5, 'The Vegetarian', 'Han Kang', 'Changbi', 2007, '어느 날 갑자기 육식을 거부하게 된 영혜의 이야기.', 'book/5.pdf', 'cover/5.jpg', 3.9, 520, 'ko', '9788936433598', '채식주의자', '한강', 'cover/5_ko.jpg', NOW()),
(6, 'The Fellowship of the Ring', 'J.R.R. Tolkien', 'Allen & Unwin', 1954, '중간계의 운명을 건 반지 원정대의 모험이 시작된다.', 'book/6.epub', 'cover/6.jpg', 4.9, 1500, 'en', '9780547928210', '반지의 제왕: 반지 원정대', 'J.R.R. 톨킨', NULL, NOW()),
(7, 'Cosmos', 'Carl Sagan', 'Random House', 1980, '우주의 탄생부터 인류의 미래까지 다루는 대서사시.', 'book/7.epub', 'cover/7.jpg', 4.9, 890, 'en', '9780345331359', '코스모스', '칼 세이건', NULL, NOW()),
(8, 'Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 'Scholastic', 1997, '호그와트 마법학교에 입학한 해리 포터의 첫 번째 모험.', 'book/8.epub', 'cover/8.jpg', 4.8, 3000, 'en', '9780590353427', '해리 포터와 마법사의 돌', 'J.K. 롤링', NULL, NOW()),
(9, 'Norwegian Wood', 'Haruki Murakami', 'Kodansha', 1987, '상실의 시대를 살아가는 젊은이들의 사랑과 방황.', 'book/9.epub', 'cover/9.jpg', 4.3, 1100, 'ja', '9780307744661', '상실의 시대 (노르웨이의 숲)', '무라카미 하루키', NULL, NOW()),
(10, 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'Harvill Secker', 2011, '변방의 유인원 호모 사피엔스는 어떻게 세상의 지배자가 되었는가.', 'book/10.epub', 'cover/10.jpg', 4.7, 1800, 'en', '9780062316097', '사피엔스', '유발 하라리', NULL, NOW()),
(11, 'Almond', 'Sohn Won-pyung', 'Changbi', 2017, '감정을 느끼지 못하는 소년 윤재의 특별한 성장 이야기.', 'book/11.epub', 'cover/11.jpg', 4.5, 950, 'ko', '9788936434267', '아몬드', '손원평', 'cover/11_ko.jpg', NOW()),
(12, 'Pachinko', 'Min Jin Lee', 'Grand Central Publishing', 2017, '4대에 걸친 재일교포 가족의 대서사시.', 'book/12.epub', 'cover/12.jpg', 4.6, 1300, 'en', '9781455563937', '파친코', '이민진', NULL, NOW()),
(13, 'Dune', 'Frank Herbert', 'Chilton Books', 1965, '전 우주를 지배할 힘을 가진 스파이스를 둘러싼 전쟁.', 'book/13.epub', 'cover/13.jpg', 4.7, 1400, 'en', '9780441172719', '듄', '프랭크 허버트', NULL, NOW()),
(14, 'To Kill a Mockingbird', 'Harper Lee', 'J.B. Lippincott & Co.', 1960, '편견과 위선에 맞서는 변호사 아버지와 딸의 이야기.', 'book/14.epub', 'cover/14.jpg', 4.8, 1600, 'en', '9780061120084', '앵무새 죽이기', '하퍼 리', NULL, NOW()),
(15, 'The Alchemist', 'Paulo Coelho', 'HarperTorch', 1988, '자아의 신화를 찾아 떠나는 산티아고의 여행.', 'book/15.epub', 'cover/15.jpg', 4.4, 2100, 'pt', '9780062315007', '연금술사', '파울로 코엘료', NULL, NOW());

INSERT INTO survey_question_tb (idx, content) VALUES
(1, '주로 어떤 내용의 책에 손이 가시나요?'),
(2, '책을 통해 어떤 기분을 느끼고 싶으신가요?'),
(3, '책을 통해 주로 무엇을 얻고 싶으신가요?'),
(4, '가장 최근에 감명 깊게 읽은 책은 무엇인가요?');

INSERT INTO survey_option_tb (question_idx, content) VALUES
(1, '📖 소설'),
(1, '👽 SF / 판타지'),
(1, '🔪 스릴러 / 공포'),
(1, '📈 자기계발'),
(1, '🏛️ 인문 / 사회 / 역사'),
(1, '🕵️ 추리 / 미스터리'),
(1, '💖 로맨스'),
(1, '✍️ 에세이 / 시'),
(1, '💰 경제 / 경영'),
(1, '🔬 과학');

INSERT INTO survey_option_tb (question_idx, content) VALUES
(2, '😌 힐링되는'),
(2, '⚡️ 긴장감넘치는'),
(2, '🥰 가슴따뜻한'),
(2, '🧠 지적호기심'),
(2, '🤔 생각이 깊어지는'),
(2, '🌙 밤새읽는'),
(2, '💨 가볍게 읽는'),
(2, '😆 유쾌하고 재미있는'),
(2, '😭 눈물 쏙 빼는');

INSERT INTO survey_option_tb (question_idx, content) VALUES
(3, '📚 새로운 지식과 교양 쌓기'),
(3, '✨ 나 자신을 성장시키고 발전하기'),
(3, '😊 스트레스 해소와 즐거움 찾기'),
(3, '💖 따뜻한 위로와 깊은 감동 느끼기'),
(3, '💼 업무 역량 향상 및 커리어 개발'),
(3, '🛌 잠 못 이루는 밤, 편안한 휴식 찾기'),
(3, '💡 새로운 관점과 아이디어 얻기');

INSERT INTO survey_option_tb (question_idx, book_idx) VALUES
(4, 1), 
(4, 2), 
(4, 3),
(4, 4), 
(4, 5),
(4, 6); 

INSERT INTO "party_tb" ("idx", "host_user_idx", "book_idx", "title", "description", "max_members", "current_members", "status", "is_private") 
VALUES (1, 1, 1, '테스트 독서모임', '테스트 설명입니다.', 10, 1, 'OPEN', false);

SELECT setval('user_tb_idx_seq', (SELECT MAX(idx) FROM user_tb));
SELECT setval('party_tb_idx_seq', (SELECT MAX(idx) FROM party_tb));