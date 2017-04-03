describe('Me', () => {
  describe('CollectorProfile', () => {
    const gravity = sinon.stub();
    const Me = schema.__get__('Me');
    const CollectorProfile = Me.__get__('CollectorProfile');

    beforeEach(() => {
      gravity.with = sinon.stub().returns(gravity);

      Me.__Rewire__('gravity', gravity);
      CollectorProfile.__Rewire__('gravity', gravity);

      gravity
        // Me fetch
        .onCall(0)
        .returns(Promise.resolve({}));
    });

    afterEach(() => {
      Me.__ResetDependency__('gravity');
      CollectorProfile.__ResetDependency__('gravity');
    });

    it('returns the collector profile', () => {
      const query = `
        {
          me {
            collector_profile {
              id
              name
              email
              self_reported_purchases
            }
          }
        }
      `;

      const collectorProfile = {
        id: '3',
        name: 'Percy',
        email: 'percy@cat.com',
        self_reported_purchases: 'treats',
      };

      const expectedProfileData = {
        id: '3',
        name: 'Percy',
        email: 'percy@cat.com',
        self_reported_purchases: 'treats',
      };

      gravity
        .onCall(1)
        .returns(Promise.resolve(collectorProfile));

      return runAuthenticatedQuery(query)
      .then(({ me: { collector_profile } }) => {
        expect(collector_profile).toEqual(expectedProfileData);
      });
    });
  });
});