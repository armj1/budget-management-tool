import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import DashboardView from "@/views/dashboard-view";
import AddInitialData from "./dashboard/add-initial-data";

const prisma = new PrismaClient();

const Dashboard = (data: any) => {
  if (data.newUser == 0) {
    return <DashboardView {...data} />;
  } else {
    return <AddInitialData />;
  }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const userData = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });
  return {
    props: {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      newUser: userData?.newUser,
    },
  };
}

export default Dashboard;
