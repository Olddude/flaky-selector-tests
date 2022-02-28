import { Foo } from '../../models/foo';
import { selectFoo } from './do-something.selectors';
import { DoSomethingSelectorsFixture } from './do-something.selectors.spec.fixture';

describe('DoSomethingFoo Selectors', () => {
  describe('select foo', () => {
    it('should return foo', () => {

      // Arrange
      const fixture = new DoSomethingSelectorsFixture();
      fixture.setupDoSomethingState();

      // Act
      const result = selectFoo(fixture.getStateForFeature());

      // Assert
      expect(result).not.toBeNull();
      expect(result).not.toBeUndefined();
      expect(result).toEqual(fixture.state.foo as Foo);
    });
  });
});
