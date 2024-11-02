import { Controller } from '@nestjs/common';

import { FLASHCARD_ROUTES } from 'src/common/routes';

@Controller(FLASHCARD_ROUTES.BASE)
export class FlashcardController {}
