import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reviews, ReviewsSchema } from '@module/reviews/schemas/review.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reviews.name, schema: ReviewsSchema }])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
