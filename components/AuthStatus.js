'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
export default function AuthStatus(){
  const { data: session } = useSession();
  if(!session) return <button className='btn' onClick={()=>signIn()}>Sign in</button>;
  return (<div style={{display:'flex', gap:8, alignItems:'center'}}><span>{session.user.email}</span><button className='btn' onClick={()=>signOut()}>Sign out</button></div>);
}
