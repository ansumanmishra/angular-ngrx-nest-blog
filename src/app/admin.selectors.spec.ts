import * as fromAdmin from './admin.reducer';
import { selectAdminState } from './admin.selectors';

describe('Admin Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAdminState({
      [fromAdmin.adminFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
