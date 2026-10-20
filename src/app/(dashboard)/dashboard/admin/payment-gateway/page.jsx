"use client";

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { CheckCircle2, CreditCard, Loader2 } from 'lucide-react';
import { fetchAdminGateways, switchPaymentGateway } from '@/lib/action/payment';
import { getGatewayInfo } from '@/lib/paymentGateways';

const PaymentGatewayPage = () => {
    const [gateways, setGateways] = useState([]);
    const [activeGateway, setActiveGateway] = useState('');
    const [loading, setLoading] = useState(true);
    const [switching, setSwitching] = useState('');

    const loadGateways = async () => {
        try {
            const response = await fetchAdminGateways();
            setGateways(response.gateways || []);
            setActiveGateway(response.activeGateway || '');
        } catch (error) {
            Swal.fire('Error!', error.response?.data?.message || 'Failed to load payment gateways.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGateways();
    }, []);

    const handleSwitch = async (gateway) => {
        const { isConfirmed } = await Swal.fire({
            title: `Switch to ${gateway.label}?`,
            text: `New payments will be sent to the ${gateway.label} checkout page. Payments already started keep their own gateway.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#04cccc',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, switch',
        });

        if (!isConfirmed) return;

        setSwitching(gateway.name);
        try {
            const response = await switchPaymentGateway(gateway.name);
            setActiveGateway(response.activeGateway);
            setGateways(response.gateways || gateways);
            Swal.fire({ icon: 'success', title: 'Gateway updated', text: response.message, confirmButtonColor: '#04cccc' });
        } catch (error) {
            Swal.fire('Error!', error.response?.data?.message || 'Failed to switch the gateway.', 'error');
        } finally {
            setSwitching('');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Payment Gateway
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Choose the gateway students are sent to when they pay for a course
                </p>
            </div>

            {loading ? (
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading gateways...
                </div>
            ) : gateways.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No payment gateways found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {gateways.map((gateway) => {
                        const { logo } = getGatewayInfo(gateway.name, gateway.label);
                        const isActive = gateway.name === activeGateway;
                        const isSwitching = switching === gateway.name;

                        return (
                            <div
                                key={gateway.name}
                                className={`rounded-xl border p-5 bg-slate-50 dark:bg-slate-900 transition-colors ${isActive
                                    ? 'border-[#04cccc] shadow-md shadow-[#04cccc]/10'
                                    : 'border-slate-200 dark:border-slate-800'
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-11 h-11 rounded-lg bg-white dark:bg-black border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                                            {logo ? (
                                                <img src={logo} alt={gateway.label} className="h-6 w-6 object-contain" />
                                            ) : (
                                                <CreditCard className="w-5 h-5 text-[#04cccc]" />
                                            )}
                                        </div>
                                        <h2 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                                            {gateway.label}
                                        </h2>
                                    </div>

                                    {isActive && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#04cccc]/10 text-[#04cccc]">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Active
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs mb-4 text-slate-500 dark:text-slate-400">
                                    {gateway.configured
                                        ? 'Credentials found on the server'
                                        : 'Credentials are missing on the server'}
                                </p>

                                <button
                                    onClick={() => handleSwitch(gateway)}
                                    disabled={isActive || !gateway.configured || Boolean(switching)}
                                    className="w-full py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-[#04cccc] to-[#15a3a3] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
                                >
                                    {isSwitching && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isActive ? 'Currently active' : gateway.configured ? 'Set as active' : 'Not configured'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PaymentGatewayPage;
