import { Statistic, Card, Alert } from 'antd';

const HomeStatistic = () => {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
      <Card bordered={false}>
        <Statistic
          title="累计用户"
          value={546}
          valueStyle={{ color: '#ff4d4d' }}
        />
      </Card>

      <Card bordered={false}>
        <Statistic
          title="持仓用户"
          value={128}
          valueStyle={{ color: '#ff4d4d' }}
        />
      </Card>

      <Card bordered={false}>
        <Statistic
          title="今日新增"
          value={32}
          valueStyle={{ color: '#ff4d4d' }}
        />
      </Card>

      <Card bordered={false}>
        <Statistic
          title="今日活跃"
          value={64}
          valueStyle={{ color: '#ff4d4d' }}
        />
      </Card>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="flex-1 m-5">
      <Alert
        message="系统提示"
        description="这个页面的功能还没有开发，下面的数字都是假的。"
        type="success"
        className="mb-4"
      />

      <HomeStatistic />
    </div>
  );
};

export default HomePage;
