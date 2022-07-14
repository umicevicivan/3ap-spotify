import { TestBed } from '@angular/core/testing';

import { AlbumResolver } from './album.resolver';

describe('AlbumResolver', () => {
  let resolver: AlbumResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AlbumResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
