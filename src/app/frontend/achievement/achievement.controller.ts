import { AchievementService } from "@/shared/achievement/achievement.service";
import { User } from "@/shared/auth/decorators";
import { Controller, Get, Query } from "@nestjs/common";

@Controller("achievement")
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) { }

  @Get()
  async getAchievements(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("categoryId") categoryId: number = 0,
    @User() user
  ) {
    return await this.achievementService.getAchievements(page, limit, categoryId, user?.id);
  }

  @Get("user-process")
  async getAchievementProcess(
    @User() user
  ) {
    return await this.achievementService.userProcess(user?.id);
  }

  @Get("category")
  async getAchievementCategory() {
    return await this.achievementService.getAchievementCategory();
  }

  @Get('info')
  async getAchievementInfo() {
    return await this.achievementService.getAchievementInfo();
  }

  @Get("sysnc-data")
  async sysncData() {
    return await this.achievementService.sysncData();
  }
}
