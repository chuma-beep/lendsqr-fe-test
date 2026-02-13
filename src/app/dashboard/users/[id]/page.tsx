"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useFetchUserDetails } from "../../../../hooks/useFetchUserDetails";
import { userObject } from "../../../../global";
import { SkeletonUserDetails } from "@/components/Skeleton";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.id ? Number(params.id) : 1;
  const { userDetails, isLoading, error } = useFetchUserDetails(userId);
  const [user, setUser] = useState<userObject | null>(null);

  useEffect(() => {
    if (userDetails) {
      setUser(userDetails as userObject);
    }
  }, [userDetails]);

  if (isLoading) {
    return (
      <div className="users__details__container">
        <SkeletonUserDetails />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="users__details__container">
        <p>{error || "User not found"}</p>
        <Link href="/dashboard">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="users__details__container">
      <header className="users__container__header--nav">
        <button onClick={() => router.back()}>
          <span className="users__container__header--icon">&larr;</span>
          <span>Back to Users</span>
        </button>
      </header>

      <header className="users__container__header">
        <h3 className="users__container__header--title">User Details</h3>
        <div className="users__container__header--button">
          <button className="users__container__button-blacklist">Blacklist User</button>
          <button className="users__container__button-activate">Activate User</button>
        </div>
      </header>

      <div className="users__container__card">
        <div className="users__container__card--grid">
          <div className="users__container__card--profile">
            {user.profile?.avatar ? (
              <Image
                src={user.profile.avatar}
                alt="avatar"
                width={80}
                height={80}
                unoptimized
              />
            ) : (
              <div>
                {user.profile?.firstName?.[0]}
                {user.profile?.lastName?.[0]}
              </div>
            )}
            <div>
              <h3 className="users__container__card--username">
                {user.profile?.firstName} {user.profile?.lastName}
              </h3>
              <h4 className="users__container__card--acc-number">{user.accountNumber}</h4>
            </div>
          </div>

          <div className="users__container__card--rating">
            <h4 className="users__container__card--rating-title">User&apos;s Tier</h4>
            <div>
              {[1, 2, 3].map((star) => (
                <span key={star}>★</span>
              ))}
            </div>
          </div>

          <div className="users__container__card--bank">
            <h3 className="users__container__card--bank-balance">{user.accountBalance}</h3>
            <h4 className="users__container__card--bank-name">9912345678/Providus Bank</h4>
          </div>
        </div>

        <ul className="users__container__card--route">
          <li className="users__container__card--route-item users__container__card--route-active">
            <span>General Details</span>
          </li>
          <li className="users__container__card--route-item">
            <span>Documents</span>
          </li>
          <li className="users__container__card--route-item">
            <span>Bank Details</span>
          </li>
          <li className="users__container__card--route-item">
            <span>Loans</span>
          </li>
          <li className="users__container__card--route-item">
            <span>Savings</span>
          </li>
          <li className="users__container__card--route-item">
            <span>App and System</span>
          </li>
        </ul>
      </div>

      <div className="users__general">
        <div className="users__general__section">
          <h3 className="users__general__title">Personal Information</h3>
          <div className="users__general__grid">
            <div>
              <p className="users__general__label">Full Name</p>
              <p className="users__general__value">
                {user.profile?.firstName} {user.profile?.lastName}
              </p>
            </div>
            <div>
              <p className="users__general__label">Phone Number</p>
              <p className="users__general__value">{user.profile?.phoneNumber}</p>
            </div>
            <div>
              <p className="users__general__label">Email Address</p>
              <p className="users__general__value">{user.email}</p>
            </div>
            <div>
              <p className="users__general__label">BVN</p>
              <p className="users__general__value">{user.profile?.bvn}</p>
            </div>
            <div>
              <p className="users__general__label">Gender</p>
              <p className="users__general__value">{user.profile?.gender}</p>
            </div>
            <div>
              <p className="users__general__label">Marital Status</p>
              <p className="users__general__value">Single</p>
            </div>
            <div>
              <p className="users__general__label">Children</p>
              <p className="users__general__value">None</p>
            </div>
            <div>
              <p className="users__general__label">Type of Residence</p>
              <p className="users__general__value">Parent&apos;s Apartment</p>
            </div>
          </div>
        </div>

        <div className="users__general__section">
          <h3 className="users__general__title">Education and Employment</h3>
          <div className="users__general__grid">
            <div>
              <p className="users__general__label">Level of Education</p>
              <p className="users__general__value">{user.education?.level}</p>
            </div>
            <div>
              <p className="users__general__label">Employment Status</p>
              <p className="users__general__value">{user.education?.employmentStatus}</p>
            </div>
            <div>
              <p className="users__general__label">Sector of Employment</p>
              <p className="users__general__value">{user.education?.sector}</p>
            </div>
            <div>
              <p className="users__general__label">Duration of Employment</p>
              <p className="users__general__value">{user.education?.duration}</p>
            </div>
            <div>
              <p className="users__general__label">Office Email</p>
              <p className="users__general__value">{user.education?.officeEmail}</p>
            </div>
            <div>
              <p className="users__general__label">Monthly Income</p>
              <p className="users__general__value">
                {user.education?.monthlyIncome?.[0]} - {user.education?.monthlyIncome?.[1]}
              </p>
            </div>
            <div>
              <p className="users__general__label">Loan Repayment</p>
              <p className="users__general__value">{user.education?.loanRepayment}</p>
            </div>
          </div>
        </div>

        <div className="users__general__section">
          <h3 className="users__general__title">Socials</h3>
          <div className="users__general__grid">
            <div>
              <p className="users__general__label">Twitter</p>
              <p className="users__general__value">{user.socials?.twitter}</p>
            </div>
            <div>
              <p className="users__general__label">Facebook</p>
              <p className="users__general__value">{user.socials?.facebook}</p>
            </div>
            <div>
              <p className="users__general__label">Instagram</p>
              <p className="users__general__value">{user.socials?.instagram}</p>
            </div>
          </div>
        </div>

        <div className="users__general__section">
          <h3 className="users__general__title">Guarantor</h3>
          <div className="users__general__grid">
            <div>
              <p className="users__general__label">Full Name</p>
              <p className="users__general__value">
                {user.guarantor?.firstName} {user.guarantor?.lastName}
              </p>
            </div>
            <div>
              <p className="users__general__label">Phone Number</p>
              <p className="users__general__value">{user.guarantor?.phoneNumber}</p>
            </div>
            <div>
              <p className="users__general__label">Email Address</p>
              <p className="users__general__value">placeholder@example.com</p>
            </div>
            <div>
              <p className="users__general__label">Relationship</p>
              <p className="users__general__value">Sibling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
