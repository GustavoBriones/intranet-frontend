import { FocoDirective } from './foco.directive';

describe('FocoDirective', () => {
  it('should create an instance', () => {
    let ele: any;
    const directive = new FocoDirective(ele);
    expect(directive).toBeTruthy();
  });
});
