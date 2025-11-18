INSERT INTO book_tb (
    idx, 
    title, 
    author, 
    publisher, 
    book_file_path, 
    cover_image_path, 
    average_rating, 
    ratings_count, 
    language_code, 
    korean_title, 
    korean_author, 
    created_at
) VALUES 
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner', '/files/1.epub', '/covers/1.jpg', 4.5, 1230, 'en', '위대한 개츠비', 'F. 스콧 피츠제럴드', NOW()),
(2, '1984', 'George Orwell', 'Harcourt Brace', '/files/2.pdf', '/covers/2.jpg', 4.2, 980, 'en', '1984', '조지 오웰', NOW()),
(3, '어린 왕자', '앙투안 드 생텍쥐페리', '열린책들', '/files/3.epub', '/covers/3.jpg', 4.1, 2500, 'ko', '어린 왕자', '앙투안 드 생텍쥐페리', NOW()),
(4, 'Demian', 'Hermann Hesse', 'S. Fischer Verlag', '/files/4.epub', '/covers/4.jpg', 3.9, 760, 'de', '데미안', '헤르만 헤세', NOW()),
(5, '채식주의자', '한강', '창비', '/files/5.pdf', '/covers/5.jpg', 3.7, 520, 'ko', '채식주의자', '한강', NOW()),
(6, 'The Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', 'Allen & Unwin', '/files/6.epub', '/covers/6.jpg', 3.5, 1500, 'en', '반지의 제왕: 반지 원정대', 'J.R.R. 톨킨', NOW());

INSERT INTO survey_question_tb (idx, content) VALUES
(1, '주로 어떤 내용의 책에 손이 가시나요?'),
(2, '책을 통해 어떤 기분을 느끼고 싶으신가요?'),
(3, '가장 최근에 감명 깊게 읽은 책은 무엇인가요?'),
(4, '책을 통해 주로 무엇을 얻고 싶으신가요?');

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

INSERT INTO survey_option_tb (question_idx, book_idx) VALUES
(3, 1), 
(3, 2), 
(3, 3),
(3, 4), 
(3, 5),
(3, 6); 

INSERT INTO survey_option_tb (question_idx, content) VALUES
(4, '📚 새로운 지식과 교양 쌓기'),
(4, '✨ 나 자신을 성장시키고 발전하기'),
(4, '😊 스트레스 해소와 즐거움 찾기'),
(4, '💖 따뜻한 위로와 깊은 감동 느끼기'),
(4, '💼 업무 역량 향상 및 커리어 개발'),
(4, '🛌 잠 못 이루는 밤, 편안한 휴식 찾기'),
(4, '💡 새로운 관점과 아이디어 얻기');

