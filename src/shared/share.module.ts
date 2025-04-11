import { Global, Module } from "@nestjs/common";
import { WowVersionModule } from "./wow-version/wow-version.module";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from "./database/database.module";
import { AchievementModule } from "./achievement/achievement.module";
import { CollectGalleryModule } from "./collect-gallery/collect-gallery.module";

@Global()
@Module({
  imports: [
    DatabaseModule,
    AchievementModule,
    CollectGalleryModule,
    WowVersionModule,
    UserModule,
  ],
  providers: [],

  exports: [
    AchievementModule,
    CollectGalleryModule,
    WowVersionModule,
    UserModule,
  ],
})
export class SharedModule {}
