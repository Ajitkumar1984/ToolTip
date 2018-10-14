import { XellotooltipModule } from './xellotooltip.module';

describe('XellotooltipModule', () => {
  let xellotooltipModule: XellotooltipModule;

  beforeEach(() => {
    xellotooltipModule = new XellotooltipModule();
  });

  it('should create an instance', () => {
    expect(xellotooltipModule).toBeTruthy();
  });
});
