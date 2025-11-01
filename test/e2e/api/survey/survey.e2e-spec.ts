import { Test } from '@nestjs/testing';
import { PrismaService } from 'prisma/prisma.service';
import { AppModule } from 'src/app.module';

// TODO : 토큰 구현 후 구조 변경 필요

describe('Survey E2E test', () => {
  let prisma: PrismaService;
  let app;
  let mockUser;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);
    await app.init();
    const mockUser = await prisma.user.create({
      data: {
        nickname: 'e2e_mock_user',
        gender: 'FEMALE',
        type: 'BASIC',
        basicAuths: {
          create: {
            email: 'e2e@example.com',
            password: 'hashed_password',
            id: 'e2e-id-1',
          },
        },
      },
    });

    const surveyResponse = [2, 3, 4].map((optionIdx) => ({
      userIdx: mockUser.idx,
      questionIdx: 1,
      optionIdx: optionIdx,
    }));

    await prisma.surveyResponse.createMany({
      data: surveyResponse,
    });
  });

  afterEach(async () => {
    await prisma.surveyResponse.deleteMany({
      where: {
        idx: mockUser.idx,
      },
    });
    await prisma.userBasic.deleteMany({ where: { userIdx: mockUser.idx } });
    await prisma.user.delete({ where: { idx: mockUser.idx } });
    await app.close();
  });
});
