import { Controller } from '@nestjs/common';

import { USER_ROUTES } from 'src/common/routes';

@Controller(USER_ROUTES.BASE)
export class UserController {}
