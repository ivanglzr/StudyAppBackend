import { Controller } from '@nestjs/common';

import { DOCUMENT_ROUTES } from 'src/common/routes';

@Controller(DOCUMENT_ROUTES.BASE)
export class DocumentController {}
