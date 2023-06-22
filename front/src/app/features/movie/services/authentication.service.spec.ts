import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator/jest';
import { take } from 'rxjs';

import { User } from '../interfaces';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let spectator: SpectatorHttp<AuthenticationService>;
  const createHttp = createHttpFactory(AuthenticationService);
  let userMock: User = { password: 'password', username: 'username' };

  beforeEach(() => {
    spectator = createHttp();
  });

  it('Should load token from API', () => {
    spectator.service.authent(userMock).subscribe();
    spectator.expectOne('http://localhost:3000/auth/login', HttpMethod.POST);
  });

  it('Should post new user to API', () => {
    spectator.service.authent(userMock).pipe(take(1)).subscribe();
    const req = spectator.expectOne('http://localhost:3000/auth/login', HttpMethod.POST);
    expect(req.request.body).toEqual(userMock);
  });
});
