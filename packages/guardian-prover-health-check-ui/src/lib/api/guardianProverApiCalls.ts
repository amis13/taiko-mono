import { healthCheckRoute, livenessRoute, uptimeRoute } from '$lib/routes';
import type { HealthCheck, PageResponse, UptimeResponse } from '$lib/types';
import axios from 'axios';

export async function fetchGuardianProverHealthChecksFromApi(
	baseURL: string,
	page: number,
	size: number,
	guardianProverId?: number
): Promise<PageResponse<HealthCheck>> {
	let url;
	if (guardianProverId) {
		url = `${baseURL}/${healthCheckRoute}/${guardianProverId}`;
	} else {
		url = `${baseURL}/${healthCheckRoute}`;
	}

	const resp = await axios.get<PageResponse<HealthCheck>>(url, {
		params: {
			page: page,
			size: size
		}
	});

	return resp.data;
}

export async function fetchLatestGuardianProverHealthCheckFromApi(
	baseURL: string,
	guardianProverId: number
): Promise<HealthCheck> {
	const url = `${baseURL}/${livenessRoute}/${guardianProverId}`;

	const resp = await axios.get<HealthCheck>(url);

	return resp.data;
}

export async function fetchUptimeFromApi(
	baseURL: string,
	guardianProverId: number
): Promise<number> {
	const url = `${baseURL}/${uptimeRoute}/${guardianProverId}`;

	const resp = await axios.get<UptimeResponse>(url);

	return resp.data.uptime;
}
