import Link from "next/link";
import { Button } from "antd";

const HomePage = () => {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Welcome to Project Management App</h1>
      <Link href="/login">
        <Button type="primary">Login</Button>
      </Link>
    </div>
  );
};

export default HomePage;
