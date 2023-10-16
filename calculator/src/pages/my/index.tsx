import { PageInput } from '@/components/PageInput';
import { BackPageButton } from '@/components/BackPageButtons';
import { AuthLayout } from '@/layouts/AuthLayout';
import { BasicTable } from '@/atoms/table/BasicTable';
  

export default function MyPage() {
  return (
      <AuthLayout>
        <PageInput placeholder='Give me a text' />
        <BasicTable />
        <BackPageButton href='/mybuttons' />
      </AuthLayout>
  );
}