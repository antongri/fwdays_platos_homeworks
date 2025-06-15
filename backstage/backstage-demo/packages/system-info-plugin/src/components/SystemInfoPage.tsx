import { Content, Page, Header, HeaderLabel } from '@backstage/core-components';

export const SystemInfoPage = () => {
  return (
    <Page themeId="tool">
      <Header title="System Info" subtitle="Overview of the system">
        <HeaderLabel label="Owner" value="Team A" />
      </Header>
      <Content>
        <p>This is your System Info plugin page!</p>
      </Content>
    </Page>
  );
};