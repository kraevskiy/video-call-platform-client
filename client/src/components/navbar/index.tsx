import Image from 'next/image';
import Time from '@/components/navbar/time';
import MyAvatar from '@/components/navbar/my-avatar';

const Navbar = () => {
  return (
    <div className="bg-light-primary dark:bg-dark-primary flex w-full p-5 justify-between items-center">
      <Image src="/logo.png" alt="Video platform" width={40} height={38} quality={100}/>
      <div className="flex items-center gap-x-5">
        <Time />
        <MyAvatar />
      </div>
    </div>
  );
};

export default Navbar;
